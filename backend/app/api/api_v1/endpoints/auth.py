from datetime import timedelta
from typing import Any
import os
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm, HTTPBearer
from sqlalchemy.orm import Session
from pydantic import BaseModel

from app.core.config import settings
from app.core.security import create_access_token, get_password_hash, verify_password
from app.schemas.auth import Token, UserCreate, User
from app.services.auth import authenticate_user, get_current_user
from app.db.session import get_db

# JWT token verification
security = HTTPBearer()

def get_current_employee(token: str = Depends(security)) -> str:
    """Verify JWT token and return employee email"""
    try:
        from app.core.security import verify_token
        payload = verify_token(token.credentials)
        email = payload.get("sub")
        if email is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token",
                headers={"WWW-Authenticate": "Bearer"},
            )
        return email
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )

# Employee login schemas
class EmployeeLogin(BaseModel):
    email: str
    password: str

class EmployeeLoginResponse(BaseModel):
    success: bool
    message: str
    access_token: str = None
    token_type: str = "bearer"

router = APIRouter()

@router.post("/login", response_model=Token)
async def login_access_token(
    db: Session = Depends(get_db),
    form_data: OAuth2PasswordRequestForm = Depends()
) -> Any:
    """
    OAuth2 compatible token login, get an access token for future requests
    """
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    elif not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Inactive user"
        )
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return {
        "access_token": create_access_token(
            user.id, expires_delta=access_token_expires
        ),
        "token_type": "bearer",
    }

@router.post("/register", response_model=User)
async def register_user(
    *,
    db: Session = Depends(get_db),
    user_in: UserCreate,
) -> Any:
    """
    Create new user.
    """
    from app.models.user import User as UserModel
    
    # Check if user already exists
    user = db.query(UserModel).filter(UserModel.email == user_in.email).first()
    if user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists"
        )
    
    # Create new user
    user = UserModel(
        email=user_in.email,
        hashed_password=get_password_hash(user_in.password),
        full_name=user_in.full_name,
        is_active=True,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

@router.get("/me", response_model=User)
async def read_users_me(
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Get current user.
    """
    return current_user

@router.post("/employee-login", response_model=EmployeeLoginResponse)
async def employee_login(
    login_data: EmployeeLogin,
) -> Any:
    """
    Employee login endpoint with shared password for authorized emails.
    """
    # Authorized employee emails
    authorized_emails = [
        'risiochristopher@gmail.com',
    ]
    
    # Shared password for all employees - from environment variable
    shared_password = settings.EMPLOYEE_PASSWORD
    
    # TEMPORARY FIX: Use hardcoded password for Render
    if not shared_password or shared_password == "":
        shared_password = "tatariadmin"
        print("DEBUG: Using hardcoded password for Render")
    
    # Debug logging for Render deployment
    print(f"DEBUG: Password length on server: {len(shared_password) if shared_password else 0}")
    print(f"DEBUG: Password first 4 chars: '{shared_password[:4] if shared_password else 'none'}'")
    print(f"DEBUG: Input password: '{login_data.password}'")
    print(f"DEBUG: Password match: {login_data.password == shared_password}")
    
    # Debug logging for Render deployment
    print(f"DEBUG: Password length on server: {len(shared_password) if shared_password else 0}")
    print(f"DEBUG: Password first 4 chars: '{shared_password[:4] if shared_password else 'none'}'")
    print(f"DEBUG: Input password: '{login_data.password}'")
    print(f"DEBUG: Password match: {login_data.password == shared_password}")
    
    # Validate email and password
    if login_data.email.lower() not in [email.lower() for email in authorized_emails]:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Access denied. This login is for Tatari Systems employees only."
        )
    
    if not shared_password:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Employee authentication not configured. Please contact administrator."
        )
    
    if login_data.password != shared_password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    # Log successful login attempt (without sensitive data)
    print(f"Employee login attempt from: {login_data.email.lower()}")
    
    # Create access token (using email as user identifier)
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        subject=login_data.email.lower(), 
        expires_delta=access_token_expires
    )
    
    return EmployeeLoginResponse(
        success=True,
        message=f"Login successful! Welcome {login_data.email.lower()}",
        access_token=access_token,
        token_type="bearer"
    )

@router.get("/employee-auth-status")
async def employee_auth_status() -> Any:
    """
    Check if employee authentication is properly configured.
    """
    # Authorized employee emails
    authorized_emails = [
        'risiochristopher@gmail.com',
    ]
    
    password_configured = bool(settings.EMPLOYEE_PASSWORD and len(settings.EMPLOYEE_PASSWORD) > 0)
    
    return {
        "status": "configured" if password_configured else "not_configured",
        "password_set": password_configured,
        "password_configured": password_configured,
        "password_length": len(settings.EMPLOYEE_PASSWORD) if settings.EMPLOYEE_PASSWORD else 0,
        "password_first_4": settings.EMPLOYEE_PASSWORD[:4] if settings.EMPLOYEE_PASSWORD else "none",
        "authorized_emails_count": len(authorized_emails),
        "environment": settings.ENVIRONMENT
    }

@router.get("/debug-password")
async def debug_password() -> Any:
    """
    Debug endpoint to check password configuration.
    """
    import os
    
    return {
        "env_password": os.getenv("PASSWORD", "NOT_SET"),
        "settings_password": settings.EMPLOYEE_PASSWORD,
        "env_password_length": len(os.getenv("PASSWORD", "")) if os.getenv("PASSWORD") else 0,
        "settings_password_length": len(settings.EMPLOYEE_PASSWORD) if settings.EMPLOYEE_PASSWORD else 0,
        "environment": settings.ENVIRONMENT
    } 