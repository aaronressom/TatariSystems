import { useState, useEffect, useRef, useCallback } from "react";
import * as THREE from "three";

/* ═══ TATARI INSTITUTE v9 ═══
   30 tracked · 181 classified · ~55 signals · 8 buckets · classified globe */

const BUCKETS={1:{name:"Core Hyperscale",short:"Core",op:.85,sz:.013},2:{name:"Strategic Sovereign",short:"Sovereign",op:.7,sz:.011},3:{name:"Gateway Hub",short:"Gateway",op:.55,sz:.009},4:{name:"Scaled Emerging",short:"Emerging",op:.45,sz:.008},5:{name:"Frontier Power-Arbitrage",short:"Frontier",op:.35,sz:.007},6:{name:"Edge / Tactical",short:"Edge",op:.2,sz:.005},7:{name:"Constrained",short:"Constrained",op:.12,sz:.004},8:{name:"Irrelevant",short:"Excluded",op:.04,sz:.003}};

// [name,lat,lng,bucket,region]
const GC=[["United States",39,-98,1,"NA"],["Canada",56,-106,1,"NA"],["Mexico",23,-102,4,"NA"],["Panama",9,-80,3,"NA"],["Costa Rica",10,-84,6,"NA"],["Guatemala",15,-90,8,"NA"],["Honduras",15,-87,8,"NA"],["El Salvador",14,-89,8,"NA"],["Nicaragua",13,-85,8,"NA"],["Belize",17,-88,8,"NA"],["Cuba",22,-80,7,"NA"],["Jamaica",18,-77,6,"NA"],["Haiti",19,-72,8,"NA"],["Dominican Republic",19,-70,6,"NA"],["Trinidad and Tobago",10,-61,6,"NA"],["Bahamas",25,-77,8,"NA"],["Barbados",13,-60,8,"NA"],["Brazil",-14,-51,4,"SA"],["Chile",-34,-71,4,"SA"],["Colombia",4,-72,4,"SA"],["Argentina",-34,-64,6,"SA"],["Peru",-10,-76,6,"SA"],["Uruguay",-33,-56,6,"SA"],["Ecuador",-2,-78,6,"SA"],["Venezuela",7,-66,7,"SA"],["Bolivia",-17,-65,8,"SA"],["Paraguay",-23,-58,8,"SA"],["Guyana",5,-59,8,"SA"],["Suriname",4,-56,8,"SA"],["United Kingdom",54,-2,1,"EU"],["Germany",51,10,1,"EU"],["Netherlands",52,5,1,"EU"],["France",47,2,1,"EU"],["Ireland",53,-8,1,"EU"],["Sweden",62,15,1,"EU"],["Switzerland",47,8,4,"EU"],["Spain",40,-4,4,"EU"],["Italy",42,12,4,"EU"],["Poland",52,20,4,"EU"],["Finland",64,26,4,"EU"],["Norway",62,10,5,"EU"],["Iceland",65,-18,5,"EU"],["Denmark",56,10,6,"EU"],["Belgium",51,4,6,"EU"],["Austria",48,14,6,"EU"],["Czech Republic",50,15,6,"EU"],["Portugal",39,-8,3,"EU"],["Greece",39,22,3,"EU"],["Romania",46,25,6,"EU"],["Hungary",47,20,8,"EU"],["Bulgaria",43,25,8,"EU"],["Croatia",45,16,8,"EU"],["Slovakia",49,20,8,"EU"],["Slovenia",46,15,8,"EU"],["Lithuania",56,24,6,"EU"],["Latvia",57,25,8,"EU"],["Estonia",59,26,6,"EU"],["Serbia",44,21,8,"EU"],["Albania",41,20,8,"EU"],["North Macedonia",41,22,8,"EU"],["Montenegro",43,19,8,"EU"],["Bosnia",44,18,8,"EU"],["Moldova",47,29,8,"EU"],["Malta",36,14,8,"EU"],["Luxembourg",50,6,6,"EU"],["Cyprus",35,33,6,"EU"],["Belarus",54,28,7,"EU"],["Ukraine",49,32,7,"EU"],["UAE",24,54,2,"ME"],["Saudi Arabia",24,45,2,"ME"],["Qatar",25,51,2,"ME"],["Israel",31,35,4,"ME"],["Turkey",39,35,4,"ME"],["Bahrain",26,51,3,"ME"],["Oman",21,57,6,"ME"],["Kuwait",29,48,6,"ME"],["Jordan",31,37,6,"ME"],["Iraq",33,44,7,"ME"],["Iran",33,53,7,"ME"],["Syria",35,38,8,"ME"],["Lebanon",34,36,7,"ME"],["Yemen",15,48,8,"ME"],["Kazakhstan",48,67,5,"ME"],["Uzbekistan",41,65,7,"ME"],["Georgia",42,44,6,"ME"],["Armenia",40,45,6,"ME"],["Azerbaijan",41,48,6,"ME"],["Turkmenistan",39,60,8,"ME"],["Kyrgyzstan",41,75,8,"ME"],["Tajikistan",39,71,8,"ME"],["Afghanistan",34,66,8,"ME"],["Pakistan",30,69,4,"ME"],["South Africa",-29,24,4,"AF"],["Nigeria",10,8,4,"AF"],["Kenya",-1,38,3,"AF"],["Egypt",27,30,3,"AF"],["Morocco",32,-5,4,"AF"],["Ethiopia",9,39,5,"AF"],["DRC",-4,22,5,"AF"],["Mozambique",-18,35,5,"AF"],["Angola",-12,18,5,"AF"],["Cameroon",6,12,5,"AF"],["Rwanda",-2,30,2,"AF"],["Djibouti",12,43,3,"AF"],["Ghana",8,-2,6,"AF"],["Senegal",14,-14,6,"AF"],["Côte d'Ivoire",8,-5,6,"AF"],["Tanzania",-6,35,6,"AF"],["Uganda",1,32,6,"AF"],["Tunisia",34,9,6,"AF"],["Mauritius",-20,58,3,"AF"],["Benin",10,2,6,"AF"],["Zambia",-15,28,6,"AF"],["Botswana",-22,24,6,"AF"],["Namibia",-22,17,6,"AF"],["Gabon",-1,12,6,"AF"],["Congo-Brazzaville",-4,15,8,"AF"],["Algeria",28,2,7,"AF"],["Zimbabwe",-20,30,7,"AF"],["Libya",27,17,8,"AF"],["Sudan",16,30,8,"AF"],["South Sudan",7,30,8,"AF"],["Somalia",6,46,8,"AF"],["Eritrea",15,39,8,"AF"],["CAR",7,21,8,"AF"],["Chad",15,19,8,"AF"],["Niger",18,8,8,"AF"],["Mali",17,-4,8,"AF"],["Burkina Faso",12,-2,8,"AF"],["Guinea",11,-10,8,"AF"],["Sierra Leone",9,-12,8,"AF"],["Liberia",6,-10,8,"AF"],["Togo",8,1,8,"AF"],["Madagascar",-19,47,8,"AF"],["Malawi",-13,34,8,"AF"],["Burundi",-3,30,8,"AF"],["Eswatini",-26,31,8,"AF"],["Lesotho",-29,29,8,"AF"],["Cape Verde",16,-24,8,"AF"],["Gambia",13,-17,8,"AF"],["Mauritania",20,-12,8,"AF"],["Japan",36,138,1,"AP"],["Singapore",1,104,1,"AP"],["Australia",-27,133,1,"AP"],["South Korea",36,128,1,"AP"],["Hong Kong",22,114,1,"AP"],["China",35,105,2,"AP"],["India",21,78,2,"AP"],["Taiwan",24,121,4,"AP"],["Indonesia",-5,120,4,"AP"],["Malaysia",4,102,4,"AP"],["Thailand",15,101,4,"AP"],["Vietnam",16,108,4,"AP"],["Philippines",12,122,4,"AP"],["New Zealand",-41,174,6,"AP"],["Bangladesh",24,90,7,"AP"],["Sri Lanka",7,81,6,"AP"],["Mongolia",48,107,8,"AP"],["Myanmar",20,97,8,"AP"],["Cambodia",13,105,8,"AP"],["Laos",18,103,8,"AP"],["Nepal",28,84,8,"AP"],["Bhutan",28,90,8,"AP"],["North Korea",40,127,8,"AP"],["Brunei",5,115,8,"AP"],["Fiji",-18,179,8,"AP"],["Papua New Guinea",-6,147,8,"AP"],["Timor-Leste",-9,126,8,"AP"],["Maldives",3,73,8,"AP"],["Seychelles",-5,55,8,"AF"],["Comoros",-12,44,8,"AF"],["São Tomé",1,7,8,"AF"],["Equatorial Guinea",2,10,8,"AF"],["Guinea-Bissau",12,-15,8,"AF"],["Kosovo",43,21,8,"EU"],["Saint Lucia",14,-61,8,"NA"],["Grenada",12,-62,8,"NA"],["Antigua and Barbuda",17,-62,8,"NA"],["Dominica",15,-61,8,"NA"],["Saint Vincent",13,-61,8,"NA"],["Saint Kitts",17,-63,8,"NA"]];

const RN={NA:"North America",SA:"South America",EU:"Europe",ME:"Middle East & Central Asia",AF:"Africa",AP:"Asia-Pacific"};
const RO=["NA","SA","EU","ME","AF","AP"];

function scoreBand(v){if(v>=75)return{label:"High",c:"rgba(255,255,255,0.7)"};if(v>=50)return{label:"Mod-High",c:"rgba(255,255,255,0.55)"};if(v>=35)return{label:"Moderate",c:"rgba(255,255,255,0.4)"};if(v>=20)return{label:"Low-Mod",c:"rgba(255,255,255,0.3)"};return{label:"Low",c:"rgba(255,255,255,0.2)"};}
function clean(t){if(typeof t!=="string")return t;return t.replace(/\s*\[(FACT|EST|JUDGMENT|INFERENCE|PARTIAL|REPORTED CLAIM)[^\]]*\]/gi,"").replace(/\s{2,}/g," ").trim();}
function pStatus(i){if(i.ps)return i.ps;return i.sources?"sourced":"unsourced";}
const SD={sourced:{l:"Sourced",c:"rgba(150,255,150,0.4)"},unsourced:{l:"Pending",c:"rgba(255,200,100,0.3)"}};

// ─── 30 TRACKED COUNTRIES ───
// 12 DEEP (full cards) + 18 COMPACT (key metrics)
const C = {
  // ═══ 12 DEEP-TRACKED ═══
  ET:{n:"Ethiopia",r:"East Africa",la:9.02,lo:38.75,pop:"126M",bk:5,up:"Mar 2026",ps:"sourced",
    hl:"Stranded hydro giant. 45+ GW potential, 5.15 GW GERD operational. DC market: $226M by 2028 at 15.5% CAGR. Digital Ethiopia 2025 initiative live.",
    sc:{csi:28,p2c:72,lps:25,ccr:18,ovr:36},
    d:{power:"Hydro 90%+ (nearly all-renewable grid). 5.2 GW installed. GERD adds 5.15 GW (Sep 2025). $0.02–0.04/kWh — cheapest reliable power in sub-Saharan Africa. Transmission to demand centers remains binding constraint — Raxio bypasses via dedicated MV lines from substation.",connectivity:"Landlocked. Djibouti corridor (PEACE, DARE1, EASSy) + Kenya (SEACOM, TEAMS). ~70% Huawei telecom. ET-IX nascent. Safaricom 4G/5G expansion (World Bank-funded). Ethio Telecom-Korea Smart City MoU (Jul 2023).",regulation:"Proclamation 1321/2024. Implicit localization. INSA early enforcement. Digital Ethiopia 2025 national strategy. Ethio Telecom privatization stalled.",compute:"~18 MW operational. Raxio ET1 (Tier III, 3 MW, 800 racks, Addis Ababa Ethio ICT Park). Wingu.Africa (10 MW when fully built, 161k sqft). Safaricom DC (pre-fab). Ethio Telecom DC. Red Fox, Sun Data World, ScutiX co-located at Ethio ICT Park. Market: $95M (2022) → $226M (2028) at 15.5% CAGR.",finance:"IFC $100M (Raxio platform: ET, MZ, CD, CI, TZ, AO). Raxio $46M additional equity (2024). Proparco, EAAIF, BII. IJGlobal Deal of Year Africa 2026.",risk:"MODERATE geopol (GERD/Egypt water tensions). FX constraints. Djibouti import logistics. Diesel backup: 90,000 litres on-site per 1.5 MW facility."},
    wl:["GERD commissioning","Safaricom fiber","FX reform","Ethio Telecom privatization"],pj:["gerd","raxio_et","tatari_mining"],
    sources:[{id:"ET-p1",claim:"45+ GW hydro",type:"internal",source:"Tatari — Stranded Gigawatt",confidence:"high",status:"verified"},{id:"ET-p2",claim:"GERD 5.15 GW",type:"internal",source:"Tatari — Stranded Gigawatt",confidence:"high",status:"verified"},{id:"ET-p3",claim:"$0.02–0.04/kWh",type:"internal",source:"Tatari — Stranded Gigawatt",confidence:"medium",status:"partial"},{id:"ET-c1",claim:"~15 MW DC",type:"secondary",source:"Systalink",confidence:"medium",status:"partial"},{id:"ET-c2",claim:"Raxio IFC-backed",type:"primary",source:"IFC/Raxio press release Apr 2025",confidence:"high",status:"verified"},{id:"ET-n1",claim:"~70% Huawei",type:"internal",source:"Tatari — China's Fiber Footprint",confidence:"medium",status:"partial"}]},
  NG:{n:"Nigeria",r:"West Africa",la:6.52,lo:3.38,pop:"230M+",bk:4,up:"Mar 2026",ps:"sourced",
    hl:"Largest addressable market. ~137 MW, 17 DCs. $15M/MW build cost (diesel premium). CBN mandate active. Digital Realty 160 MW planned. Rack Centre + MDXi operational.",
    sc:{csi:30,p2c:18,lps:55,ccr:40,ovr:36},
    d:{power:"~13 GW installed, ~4 GW available. 60%+ DC power from diesel. Grid collapses multiple times/year.",connectivity:"Lagos: MainOne, SAT-3, ACE, 2Africa, Equiano, WACS. IXPN Lagos largest W. Africa.",regulation:"NDPR 2019, NDPA 2023. CBN local routing. NITDA 40% local hosting. Enforcement ACTIVE.",compute:"~137 MW, 17 facilities = 3rd most in Africa. Build cost: $15M/MW (highest on continent) due to diesel dependency. Rack Centre (6.5 MW), MDXi/Equinix Lagos, ADC ($300M DFC-backed), Medallion. Digital Realty: 160 MW planned. SA + NG dominate: 70%+ of Africa operational capacity combined.",finance:"DFC $300M (ADC). IFC. AfDB.",risk:"FX volatility. CRITICAL grid — single biggest constraint."},
    wl:["Grid stability","CBN digital currency","NITDA expansion","Embedded gen licenses"],pj:["rack_centre","mdxi","adc_ng"],
    sources:[{id:"NG-c1",claim:"137 MW / 17 DCs",type:"secondary",source:"AEC 2026 Outlook",confidence:"medium",status:"partial"},{id:"NG-p1",claim:"60%+ diesel",type:"secondary",source:"African Business Jan 2026",confidence:"medium",status:"partial"},{id:"NG-r1",claim:"CBN local routing",type:"internal",source:"Tatari — Data Localization",confidence:"high",status:"verified"},{id:"NG-f1",claim:"DFC $300M",type:"internal",source:"Tatari — Stranded Gigawatt",confidence:"high",status:"verified"}]},
  KE:{n:"Kenya",r:"East Africa",la:-1.29,lo:36.82,pop:"56M",bk:3,up:"Mar 2026",ps:"sourced",
    hl:"East Africa hub. 60%+ renewable. Oracle cloud live. MSFT/G42 1 GW announced — NO CONSTRUCTION EVIDENCE.",
    sc:{csi:38,p2c:48,lps:40,ccr:45,ovr:43},
    d:{power:"~3.8 GW, 60%+ renewable (geothermal, hydro, wind, solar). $0.08–0.12/kWh.",connectivity:"Mombasa: SEACOM, TEAMS, EASSy, LION2, 2Africa, DARE1. KIXP Nairobi.",regulation:"DPA 2019. ODPC operational. CBK financial data localization.",compute:"~40 MW operational (13 existing DCs, 9 upcoming per AEC Jan 2026). iXAfrica (Oracle region, $200M debt Sep 2025), EADC, Liquid (50 MW), Safaricom, Atlancis/Servernah GPU cluster (H100s, Nov 2025). MSFT/G42 Naivasha: 18 months post-announcement, NO construction evidence. Kenya National AI Strategy launched Jun 2024. Konza Technopolis (smart city, 2% GDP target).",finance:"IFC, World Bank. iXAfrica $200M debt funding Sep 2025.",risk:"LOW-MODERATE. MSFT/G42 feasibility questioned (1 GW vs 3.8 GW national grid)."},
    wl:["MSFT/G42 construction evidence?","Oracle util","Geothermal PPAs","2Africa"],pj:["ixafrica","msft_g42","liquid_ke"],
    sources:[{id:"KE-c1",claim:"~40 MW",type:"secondary",source:"AEC Week Jan 2026",confidence:"medium",status:"partial"},{id:"KE-p1",claim:"60%+ renewable",type:"secondary",source:"AEC 2026",confidence:"high",status:"verified"},{id:"KE-c2",claim:"MSFT/G42 little progress",type:"secondary",source:"African Business",confidence:"medium",status:"partial"},{id:"KE-c3",claim:"iXAfrica $200M",type:"secondary",source:"Kenyan Wall Street Sep 2025",confidence:"high",status:"verified"}]},
  AE:{n:"UAE",r:"Middle East",la:25.20,lo:55.27,pop:"10M",bk:2,up:"Mar 2026",
    hl:"376 MW live (2025). 3 AWS AZs struck Mar 2026. Stargate 5 GW exposed. Hormuz closed. Khazna controls 70% capacity. $0.11/kWh — nearly 2x Saudi. G42-MSFT 200 MW expansion.",
    sc:{csi:55,p2c:60,lps:35,ccr:30,ovr:45},
    d:{power:"~35 GW. Gas + Barakah nuclear 5.6 GW. $0.11/kWh (highest in Gulf — nearly 2x Saudi). Green energy adoption limited. Abu Dhabi better positioned for new capacity than land-constrained Dubai.",connectivity:"Hormuz CLOSED Mar 2, 2026. Both Red Sea + Hormuz compromised. Fujairah cable landings (Mumbai-Marseille axis). Khazna: 70% of operational UAE capacity. SEVERELY DEGRADED connectivity.",regulation:"Federal Decree-Law 45/2021. ADGM/DIFC frameworks. Pax Silica sovereign data initiative.",compute:"376 MW live (Q4 2025). Khazna: ~210 MW core/shell capacity. AWS ME-CENTRAL-1 (2/3 AZs DAMAGED Mar 2026). G42+Microsoft: 200 MW expansion announced Nov 2025, online late 2026. Stargate 5 GW: Abu Dhabi campus — existential exposure. 85%+ of hyperscaler IT power via colocation (not self-build). EdgeConneX: ~65 MW. Self-built DCs: only 5.44% of total (65 MW).",finance:"ADIA, Mubadala, ADQ. Microsoft $15B Gulf. NVIDIA. All NOW REPRICED post-Mar 2026 strikes. UAE fastest-growing ME market: 16.77% CAGR. Insurance repricing imminent.",risk:"CRITICAL. Iran conflict ongoing. Drone swarms (541 intercepted one weekend). AWS recovery 'months not days'. Stargate bankability collapsed. $0.11/kWh limits long-term cost competitiveness vs Saudi."},
    wl:["AWS ME-CENTRAL-1 recovery timeline","Stargate construction status","Hormuz reopening","Insurance repricing"],pj:["stargate","aws_me"],sources:null},
  SA:{n:"Saudi Arabia",r:"Middle East",la:24.71,lo:46.68,pop:"37M",bk:2,up:"Mar 2026",
    hl:"$2.11B DC market (2025) → $4.35B (2031). Humain AI: 6.6 GW by 2034. NVIDIA $10B + 18,000 Blackwell chips. AWS $5.3B. center3 1 GW roadmap. Water stress: 15B liters/yr.",
    sc:{csi:60,p2c:55,lps:65,ccr:28,ovr:52},
    d:{power:"~90 GW. Oil/gas + ACWA Power 12 GW+ solar portfolio. $0.04–0.06/kWh. Water scarcity: DCs consumed 15B liters in 2024 — structural cooling risk in arid climate.",connectivity:"Red Sea COMPROMISED (Mar 2026). Overland fiber corridors being funded. Riyadh, Jeddah, Dammam as three-city hub.",regulation:"PDPL 2022. SDAIA. TIER 1 binding localization. Cloud Computing Special Economic Zone (2023): 30% of ICT spending by 2030. Mandatory cloud-first: all ministries off-premise by 2027. Million Saudis for AI: 20,000 AI experts by 2030.",compute:"410 MW+ installed (2025). Hyperscale 76% of capacity. Gulf Data Hub: 78 MW existing + 320 MW in development. center3 (stc): 1 GW roadmap by 2030. Humain: 6.6 GW by 2034, 500 MW live phase. NVIDIA deal: 18,000 Blackwell chips. Oracle $14B over 10 years (May 2025). Alfanar $1.4B (Feb 2025). ADQ + ECP $25B US DC power vehicle. Three cloud regions: Oracle Jeddah/Riyadh, AWS (2026), Microsoft 3 AZs (2026).",finance:"PIF (Public Investment Fund) anchor. AWS $5.3B. NVIDIA $10B Humain JV. Microsoft $15B Gulf. Alfanar $1.4B. Saudi market: $1.33B (2024) → $3.9B (2030) at 19.6% CAGR.",risk:"ELEVATED. Iran proximity (Op. Epic Fury). Houthi missile range. Water scarcity — 15B liters/yr cooling demand. GPU supply bottlenecks. High cooling OPEX."},
    wl:["Humain construction progress","AWS cloud region launch 2026","PDPL enforcement","Overland fiber Red Sea bypass"],pj:["humain","xai_sa"],sources:null},
  ZA:{n:"South Africa",r:"Southern Africa",la:-26.20,lo:28.05,pop:"62M",bk:4,up:"Mar 2026",
    hl:"Africa's dominant DC market. 40.76% continental share ($2.55B, 2025). Teraco JB7 live. Load-shedding ended mid-2024. National Data & Cloud Policy May 2024.",
    sc:{csi:48,p2c:35,lps:32,ccr:55,ovr:42},
    d:{power:"~58 GW. Coal + renewables. Load-shedding ended mid-2024. SOLA 195 MW solar (AWS anchor). Teraco 120 MW solar PV under construction (Free State, operational late 2026). SA govt $28.4M AI/blockchain investment Jul 2025.",connectivity:"Best in Africa. SAT-3, WACS, SEACOM, EASSy, 2Africa, Equiano. NAPAfrica largest IXP. Telecom Namibia launched Equiano cable station Aug 2024.",regulation:"POPIA enforced. National Data & Cloud Policy (May 2024) mandates domestic storage for national security data and 99.995% uptime for govt workloads. Tier 3: 89% of capacity.",compute:"355 MW+ operational. 55+ DCs. Teraco (Digital Realty) JB7: 40 MW new capacity, R8B ($442M) syndicated loan. ADC Cape Town 6 MW expansion live Feb 2026. Vantage-Attacq JV: 80 MW/$34M Joburg campus (Mar 2025). Hyperscale self-builds at 25% CAGR. Market: $2.55B (2025) → $5.28B (2031) at 12.9% CAGR.",finance:"Teraco R8B club loan. Vantage-Attacq $34M JV. Multiple DFIs. $2B+ invested by 2025. Mordor: $0.67B colocation revenue 2026.",risk:"LOW. Land/power tightening near Gauteng. Eskom fragility only material risk. Northern Cape solar builds require longer connectivity spurs."},
    wl:["Eskom stability","Google Cloud SA launch","Teraco 120 MW solar completion","Vantage-Attacq construction"],pj:["teraco","adc_za","springbok"],sources:null},
  IN:{n:"India",r:"South Asia",la:19.08,lo:72.88,pop:"1.4B",bk:2,up:"Mar 2026",
    hl:"1.52 GW operational (2025). 387 MW added in 2025 alone. $8.94B market. AdaniConneX 1 GW. Google $15B + Microsoft $17.5B + Amazon $35B committed. 33% westbound via Hormuz at risk.",
    sc:{csi:62,p2c:50,lps:75,ccr:45,ovr:58},
    d:{power:"~450 GW installed. 50% non-fossil fuel capacity by mid-2025 (184.6 GW non-hydro renewables). CtrlS 125 MWp solar farm under construction. AdaniConneX Chennai: 400 MW + 200 MW integrated renewables.",connectivity:"Mumbai 52% of total capacity — SAT-3, WACS, SEACOM, EASSy, 2Africa Pearls (180 Tbps live 2025), India-Asia-Express (IAX, 200 Tbps, 2025). Mumbai multi-cable hub + subsea redundancy. BUT 33% westbound via Hormuz NOW AT RISK.",regulation:"DPDPA 2023 mandates data localization, driving estimated 1,800 MW new demand. RBI payment localization since 2018. SEBI, IRDAI. Draft National Data Centre Policy: 20-yr tax exemptions, single-window clearance, Data Centre Economic Zones. TIER 1 layered.",compute:"1,520 MW operational (Q4 2025). 387 MW added in 2025 (vs 191 MW in 2024). NTT: 292 MW live (Jul 2025) → 400 MW target. STT GDC: 300 MW+. AdaniConneX: 1 GW roadmap, Chennai 400 MW commissioned Dec 2025. Yotta: 16,000 Nvidia H100 GPUs + 250 MW Greater Noida. Reliance Jamnagar: 1 GW planned (NVIDIA partnership). Nxtra: 800 MW target by 2028. 1.03 GW under construction (2024-28). Microsoft Hyderabad expanded 50 MW → 150 MW total (Jan 2026).",finance:"$14.7B invested 2020-2025 (86% foreign). $20-25B additional by 2030. Google $15B (Adani JV). Microsoft $17.5B. Amazon $35B target by 2030. Adani Group $10B. NTT $1.5B. CtrlS $2B. STT GDC $3.2B. Yotta $1B (GPUs). RackBank $120M (80 MW AI complex).",risk:"Hormuz cable exposure acute. Maharashtra grid interconnection queue: 18-month backlog for 100 MVA. Regulatory complexity. Cooling water demand in dry regions."},
    wl:["Hormuz latency impact","DPDPA enforcement timeline","Reliance Jamnagar construction","AdaniConneX Google JV commissioning"],pj:["yotta","adani"],sources:null},
  RW:{n:"Rwanda",r:"East Africa",la:-1.94,lo:29.87,pop:"14M",bk:2,up:"Mar 2026",
    hl:"Law 058/2021 mandates in-country storage. <10 MW capacity. Strong execution track record.",
    sc:{csi:35,p2c:22,lps:45,ccr:15,ovr:29},
    d:{power:"~240 MW installed. $0.12–0.18/kWh — highest in East Africa. Structural power deficit = binding constraint. Ethiopia import potential (GERD) via regional interconnection. Some solar IPP development.",connectivity:"Landlocked. Transit via Kenya/Tanzania. RINEX IXP. Only carrier-neutral DC in country = Raxio. Africa Interconnection Report 2025: Rwanda set to formally join carrier-neutral DC markets in 2025.",regulation:"Law 058/2021 explicit localization mandate — among Africa strongest. NCSA building enforcement capacity. Rwanda considered model governance for DFI investment.",compute:"<10 MW. Raxio (Tier III, Kigali — IFC-backed). Kigali Innovation City: long-term hyperscale ambition, currently pre-development. Population 14M with strong digital services demand (M-Pesa, mobile banking).",finance:"IFC (Raxio $100M platform). World Bank. BII. Rwanda Development Board proactive investment promotion."},
    wl:["NCSA decisions","Power imports from Ethiopia"],pj:["raxio_rw"],sources:null},
  DJ:{n:"Djibouti",r:"East Africa",la:11.59,lo:43.15,pop:"1.1M",bk:3,up:"Mar 2026",
    hl:"PEACE cable first African landing. Chinese naval base. Doraleh Port. Digital-military convergence.",
    sc:{csi:8,p2c:5,lps:10,ccr:12,ovr:9},
    d:{power:"~130 MW. $0.25+/kWh — highest in Africa. Djibouti Telecom monopoly. No competition, no incentive to lower prices.",connectivity:"PEACE (Chinese-owned, first African landing — Djibouti, Chinese naval base adjacent). DARE1, EASSy, SEACOM, AAE-1. Djibouti as THE East African cable choke point — 7+ cables. Chinese stack EXTREME: PLA Naval Base + PEACE architecture = surveillance convergence. Ethiopian traffic 100% dependent on Djibouti corridor.",compute:"Minimal. Djibouti Telecom only — government monopoly blocks colocation entrants. Digital-military convergence makes independent DC permitting near-impossible. Strategic for signals intelligence, not commercial compute.",risk:"Chinese intelligence architecture: PEACE cable + naval base in same geography = unprecedented dual-use concentration. No commercial DC ecosystem possible under current governance."},
    wl:["Naval base expansion","PEACE Phase 2"],pj:["peace_dj"],sources:null},
  CD:{n:"DRC",r:"Central Africa",la:-4.32,lo:15.31,pop:"105M+",bk:5,up:"Mar 2026",
    hl:"Largest stranded power asset on Earth. Inga 40 GW theoretical. I&II produce 1.7 GW.",
    sc:{csi:8,p2c:15,lps:12,ccr:10,ovr:11},
    d:{power:"~2.8 GW installed. Inga 40 GW theoretical potential (Inga I&II: 1.7 GW operational). $0.03–0.06/kWh where grid available. CRITICAL: transmission failure means most industrial users off-grid. Data centers must invest in dedicated MV lines from substation.",connectivity:"SAT-3 (degraded). 2Africa landed at Muanda (operational end-2025). KINIX in Kinshasa — ~20 carriers. Goma and Lubumbashi each have local IXPs. Open Access DC + Raxio both now operational in Kinshasa.",compute:"~3 MW operational. Raxio DRC (Kinshasa): Tier III, 1.5 MW, 400 racks, fully operational Feb 2026 — first carrier-neutral Tier III in DRC. Open Access Data Centres also in Kinshasa. Market: 105M+ population, near-zero current penetration = long-term structural demand. One operator exploring 4-5 upcountry facilities (mining cities).",finance:"IFC (Raxio $100M platform). AfDB. Meta involved in 2Africa cable financing."},
    wl:["Grand Inga III","2Africa Muanda","Raxio util"],pj:["inga","raxio_cd"],sources:null},
  EG:{n:"Egypt",r:"North Africa",la:30.04,lo:31.24,pop:"110M+",bk:3,up:"Mar 2026",
    hl:"15 submarine cables operational (3 more building → 18 by 2025). $278M DC market → $694M (2030) at 16.47% CAGR. UAE-Egypt MoU: 1 GW DC capacity. Cape bypass threatens transit monopoly.",
    sc:{csi:35,p2c:40,lps:30,ccr:35,ovr:35},
    d:{power:"~60 GW. Gas dominant + abundant solar (Red Sea + Western Desert). $0.04–0.07/kWh. $40B renewables investment pipeline. Government energy incentives for DC operators.",connectivity:"CRITICAL HUB. 15 operational cables (targeting 18 by end-2025). SEA-ME-WE 5, AAE-1, PEACE, Africa-1, India Europe Xpress (2026), SEA-ME-WE-6 in build. Telecom Egypt: 10 subsea landing stations + monopoly on terrestrial crossing fees. BUT: Cape rerouting + Google Blue-Raman (bypasses Egypt via Israel) threatens transit revenue. Coral Bridge (Egypt-Jordan) live Aug 2025.",regulation:"Personal Data Protection Law No. 151 (2020, GDPR-modeled). NTRA 15-year DC licensing framework (direct cable connectivity, no case-by-case approval). Digital Egypt + Vision 2030. National AI Strategy 2025 (30,000 specialists/yr). 5G launched Jun 2025 ($2.7B spectrum investment).",compute:"13 existing + 7 upcoming DCs. 180 MW to be added 2025-2030. Telecom Egypt (Smart Village DC: 4.6 MW / 2,000 racks — divesting RDH to Helios). Khazna-Benya: Egypt first hyperscale (Maadi Technology Park). Kemet DC ($450M MoU: Suez Canal Economic Zone, 80k sqm, solar-powered). UAE-Egypt: 1 GW target. Gulf Data Hub + Africa Data Centres entered 2024.",finance:"UAE-Egypt MoU for 1 GW. Kemet $450M. Green DC: 200 MW solar/wind. $40B renewable investment inflows.",risk:"Telecom Egypt transit monopoly = exorbitant fees. Cape rerouting erodes transit revenue. FX volatility (3 devaluations since 2022, imports +40-60%). Urban broadband concentration (Cairo+Delta = 70%)."},
    wl:["Suez disruptions","Cape rerouting impact"],pj:["telecom_eg"],sources:null},
  MZ:{n:"Mozambique",r:"Southern Africa",la:-25.97,lo:32.58,pop:"33M",bk:5,up:"Mar 2026",
    hl:"Cahora Bassa 2 GW exports to SA while local industry starves. Raxio operational. LNG potential.",
    sc:{csi:12,p2c:30,lps:15,ccr:20,ovr:19},
    d:{power:"Cahora Bassa 2.1 GW hydropower — but majority exported to South Africa and Zimbabwe, leaving local industry power-scarce. $0.04–0.08/kWh if available. Raxio acquiring adjacent land for dedicated on-site solar co-generation — pioneering model for African DCs. LNG (Cabo Delgado) massive reserves but insurgency risk.",connectivity:"SEACOM, EASSy at Maputo. 2Africa adding (Nacala landing). Alibaba Cloud expanded to Mozambique Jun 2024 via BCX partnership (Maputo DC).",compute:"<5 MW. Raxio MZ operational (IFC-backed). Solar+DC co-location model in development — adjacent land acquired. Alibaba Cloud presence via BCX. Market expanding with FRELIMO stability and LNG investment.",finance:"IFC (Raxio $100M platform). AfDB. LNG revenues creating digital infrastructure spending capacity."},
    wl:["Cahora Bassa reallocation","Raxio solar+DC","LNG impact"],pj:["raxio_mz"],sources:null},

  // ═══ 18 COMPACT-TRACKED ═══
  MA:{n:"Morocco",r:"North Africa",la:32,lo:-5,pop:"37M",bk:4,up:"Mar 2026",
    hl:"60%+ of Africa's planned DC pipeline. 23+ DCs. Digital Morocco 2030: $1.1B govt investment. $51M (2025) → $470M (2030). Casablanca + Rabat hubs.",
    sc:{csi:32,p2c:35,lps:30,ccr:38,ovr:34},d:{compute:"23+ facilities. Casablanca + Rabat hubs. Largest upcoming DC pipeline in Africa — 60%+ of continent's planned power capacity (Arizton Mar 2026). GITEX Africa 2026 in Marrakech hosted April 2026.",power:"Renewables scaling rapidly. Solar + wind. 45% renewable target.",regulation:"Digital Morocco 2030: $1.1B investment (Sept 2024). Tax incentives for DCs. Target: top 50 digital countries by 2030."},sources:null},
  GH:{n:"Ghana",r:"West Africa",la:8,lo:-2,pop:"34M",bk:6,up:"Mar 2026",
    hl:"West Africa secondary hub. Africa's first data protection law (2012). Accra tech ecosystem. OADC + multiple small carriers. West Africa's largest wind project (Taiba N'Diaye) regional power model.",
    sc:{csi:18,p2c:25,lps:20,ccr:25,ovr:22},d:{compute:"Multiple carrier facilities. Accra hub. Green cooling adoption. Growing fintech + startup demand. Africa Interconnection 2025: Ghana as part of expanding carrier-neutral DC market.",connectivity:"ACE, MainOne, SAT-3 at Accra. 2Africa planned landing.",regulation:"Data Protection Act 2012 — first in Africa. Data Protection Commission active. Digital payments regulatory framework mature."},sources:null},
  TZ:{n:"Tanzania",r:"East Africa",la:-6,lo:35,pop:"65M",bk:6,up:"Mar 2026",
    hl:"Raxio Tanzania IFC-backed (under construction 2025). Vodacom 12 MW Dar. Natural gas power base. Growing East Africa mid-tier hub alongside Uganda.",
    sc:{csi:14,p2c:22,lps:18,ccr:22,ovr:19},d:{compute:"Raxio TZ: IFC-backed, under construction (Dar es Salaam), expected 2025-26. Vodacom 12 MW facility. East Africa mid-tier hub. 65M population with mobile money penetration driving cloud demand.",connectivity:"EASSy, SEACOM at Dar es Salaam. 2Africa adding. Dar as emerging cable hub complementing Mombasa.",power:"Natural gas base. Kilimanjaro hydropower. Renewable transition underway. $0.07–0.10/kWh."},sources:null},
  CI:{n:"Côte d'Ivoire",r:"West Africa",la:8,lo:-5,pop:"29M",bk:6,up:"Mar 2026",
    hl:"Francophone W. Africa digital anchor. 6 DCs + Raxio IFC-backed expansion. 37.5 MW Boundiali solar (largest in CI). Abidjan IXP. WAEMU financial data flows.",
    sc:{csi:16,p2c:22,lps:18,ccr:20,ovr:19},d:{compute:"6 DCs operational. Raxio CI (IFC $100M platform). Abidjan as Francophone West Africa hub — serves Mali, Burkina Faso, Niger data flows via terrestrial fiber. WAEMU financial sector drives compliance-grade colocation demand.",power:"37.5 MWp Boundiali solar (largest in country, Jun 2023). 45% renewable target by 2030. Grid improving but still unreliable.",connectivity:"Abidjan: ACE, SAT-3, MainOne, 2Africa. PAIX Abidjan IXP. Strong intra-ECOWAS fiber build."},sources:null},
  AO:{n:"Angola",r:"Southern Africa",la:-12,lo:18,pop:"36M",bk:5,up:"Mar 2026",
    hl:"Raxio Angola largest DC in country ($30M expansion, Jul 2025). Lobito Corridor: $753M financing (late 2025, $553M US loan). SACS cable to Brazil. Oil-to-digital transition.",
    sc:{csi:10,p2c:28,lps:12,ccr:18,ovr:17},d:{compute:"Raxio Angola: largest DC in country, $30M expansion opened Jul 2025 (IFC-backed). Lobito Corridor digital infrastructure dimension emerging alongside rail/logistics. 36M population, growing mobile broadband demand.",connectivity:"SACS cable (Angola-Brazil). 2Africa landing. Luanda as Southern Africa secondary node.",power:"Oil/gas revenue. Hydropower potential (Kwanza River) underexploited. Renewable targets set but grid unreliable outside Luanda.",finance:"IFC ($100M Raxio platform). US DFC (Lobito Corridor $553M). Angola Sovereign Fund potential digital pivot."},sources:null},
  QA:{n:"Qatar",r:"Middle East",la:25,lo:51,pop:"3M",bk:2,up:"Mar 2026",
    hl:"Sovereign cloud ambitions. QIA $450B+ sovereign wealth. Hormuz cables at risk. Ooredoo regional carrier. Post-conflict capital flight destination.",
    sc:{csi:50,p2c:52,lps:40,ccr:25,ovr:42},d:{compute:"Growing sovereign cloud. Ooredoo DC operator. QIA investing in digital infrastructure post-World Cup. Cloud sovereignty push intensifying post-Epic Fury.",connectivity:"Hormuz cables at acute risk (Mar 2026). Terrestrial backup via GCC fiber.",finance:"QIA $450B+ SWF. Post-conflict capital redeployment from UAE possible.",risk:"Hormuz closure directly affects Qatar's cable access. Qatar-Saudi pipeline (Blue Line) potential data fiber corridor."},sources:null},
  BH:{n:"Bahrain",r:"Middle East",la:26,lo:51,pop:"1.5M",bk:3,up:"Mar 2026",
    hl:"AWS facility struck Mar 2026. Beyon (Batelco) DC. GCC interconnection hub. Cloud First govt policy. Economic diversification via digital.",
    sc:{csi:30,p2c:35,lps:28,ccr:22,ovr:29},d:{compute:"AWS Bahrain region (struck Mar 2026). Beyon (Batelco) operating regional carrier-neutral DC. Gateway to Saudi Eastern Province enterprise market. Cloud First policy since 2017.",connectivity:"Cables compromised post-March 2026. GCC ring as backup. Bahrain-UAE causeway fiber.",regulation:"Cloud First government policy. PDPL data protection law enacted. CTRA regulatory authority.",risk:"CCR: CRITICAL post-Mar 2026. Small geography = limited target dispersion. Insurance repricing like UAE."},sources:null},
  TR:{n:"Turkey",r:"Middle East",la:39,lo:35,pop:"86M",bk:4,up:"Mar 2026",
    hl:"86M population. Istanbul = Europe-Asia cable bridge. KVKK enforcement tightening. Emerging DC market: Equinix, NTT, Turkcell expanding. Post-conflict Gulf capital seeking neutral ground.",
    sc:{csi:35,p2c:38,lps:42,ccr:40,ovr:39},d:{compute:"Istanbul hub: Equinix, NTT, Turkcell DC expanding. Growing enterprise + government demand. Neutral geopolitical position draws interest as Gulf DC market disrupted.",regulation:"KVKK (Personal Data Protection Law): enforcement tightening 2025-2026. Data localization for financial + govt sectors. Strong localization trend.",connectivity:"Istanbul: SEA-ME-WE cables + terrestrial fiber to Europe. Unique Europe-Asia bridge position.",risk:"Turkish Lira volatility. Political risk. But neutral position vs Iran conflict = relative attractiveness."},sources:null},
  ID:{n:"Indonesia",r:"Southeast Asia",la:-5,lo:120,pop:"277M",bk:4,up:"Mar 2026",
    hl:"Largest SEA domestic demand market. Jakarta hub. $3B market by 2026. Microsoft $1.7B. Coal-heavy grid. GR 71/2019 strong localization.",
    sc:{csi:30,p2c:32,lps:45,ccr:35,ovr:36},d:{compute:"Jakarta-centric. $3B market by 2026 at 12.95% CAGR. Microsoft $1.7B committed. AWS + Google expanding. Grid reliability and permitting timelines constraining hyperscale growth.",regulation:"GR 71/2019 strong localization mandate. BAPPENAS oversight. 12–24 month enforcement horizon.",power:"Coal-heavy (65%+). Renewable transition accelerating but slow. Grid reliability outside Jakarta is a constraint."},sources:null},
  MY:{n:"Malaysia",r:"Southeast Asia",la:4,lo:102,pop:"33M",bk:4,up:"Mar 2026",
    hl:"Largest DC pipeline in SEA. Johor: 487 MW live + 4 GW pipeline. $24.4B approved under DESAC scheme. AWS $6B, Microsoft $2.2B, Google $236M. YTL-NVIDIA AI campus.",
    sc:{csi:35,p2c:38,lps:30,ccr:42,ovr:36},d:{compute:"Johor: 487 MW live (Jul 2025) + 700 MW under construction + 3.3 GW committed + 3.4 GW early-stage. Klang Valley established hub. Empyrion Digital: 200 MW campus approved. YTL-NVIDIA: AI-ready campus. 21 DC projects approved under DESAC (to Mar 2025): RM113.8B ($24.4B) total investment. Gamuda RM2.14B multi-DC contract (Aug 2025). IJM RM873.9M M&E contract (Selangor).",power:"Grid expansion: TNB RM42.8B ($10B) capex 2025-2027. Tariff hike for DC customers. Renewable hydro (Borneo). Some power constraint risk.",connectivity:"Johor-Singapore causeway (1 km). Johor-Singapore Special Economic Zone (Jan 2025). Multiple submarine cables. Low-latency access to Singapore IXPs.",regulation:"DESAC scheme: tiered investment tax allowance + special income tax rate. Green Lane Pathway (Aug 2023): expedited grid connection for DCs. 13th Malaysia Plan prioritizes digital infrastructure."},sources:null},
  TH:{n:"Thailand",r:"Southeast Asia",la:15,lo:101,pop:"72M",bk:4,up:"Mar 2026",
    hl:"BOI approved $2.7B DC investment (Mar 2025). AWS + Google + Microsoft cloud regions. Stable grid. Bangkok cluster rapidly expanding.",
    sc:{csi:28,p2c:35,lps:28,ccr:38,ovr:32},d:{compute:"AWS Thailand region live. Google cloud + $1B Thailand commitment. Microsoft investing. BOI approved $2.7B in DC/cloud projects (Mar 2025). Government incentives + stable power = hyperscale pull.",regulation:"PDPA 2019 enforcement. BOI proactive incentives for DCs. Digital Thailand strategy accelerating cloud adoption.",power:"Grid relatively stable. Renewables growing. Favorable climate for mixed cooling."},sources:null},
  VN:{n:"Vietnam",r:"Southeast Asia",la:16,lo:108,pop:"100M",bk:4,up:"Mar 2026",
    hl:"Fastest-growing ASEAN DC market. Google hyperscale facility + $1B commitment. SKT AIDC (LNG-powered) planned. Regulatory reform = key unlock.",
    sc:{csi:25,p2c:30,lps:48,ccr:30,ovr:33},d:{compute:"Google hyperscale facility under development + $1B Vietnam commitment. SKT/SK Group AIDC planned with LNG power plant + cold energy cooling. Multinational investment pace tied to regulatory reform.",regulation:"Cybersecurity Law 2018: strong data localization. Complex permitting. Regulatory reform progress will determine hyperscale acceleration.",power:"Steady renewable base. LNG development adding dispatchable capacity. Hanoi + Ho Chi Minh City as dual hubs."},sources:null},
  BR:{n:"Brazil",r:"South America",la:-14,lo:-51,pop:"215M",bk:4,up:"Mar 2026",
    hl:"Largest LATAM DC market. São Paulo hub = 60%+ of capacity. LGPD enforced. Equinix, Ascenty, ODATA. LATAM hyperscale anchor for AWS, Azure, Google.",
    sc:{csi:40,p2c:42,lps:45,ccr:45,ovr:43},d:{compute:"São Paulo dominant hub (60%+ capacity). Major operators: Equinix, Ascenty (Digital Bridge), ODATA. All three major hyperscalers have cloud regions (AWS São Paulo, Azure Brazil South, Google São Paulo). Growing Rio de Janeiro secondary hub.",regulation:"LGPD (Lei Geral de Proteção de Dados) enforced. ANPD (data protection authority) active. Increasing localization pressure from financial sector (Banco Central).",power:"Hydro-dominant grid — low-carbon advantage. Seasonal risk: drought = hydro rationing. Renewables diversification accelerating."},sources:null},
  CL:{n:"Chile",r:"South America",la:-34,lo:-71,pop:"19M",bk:4,up:"Mar 2026",
    hl:"Most stable LATAM governance. Google + AWS + Azure cloud regions. Humboldt cable (Asia-LATAM) operational. 60%+ renewable electricity. BNamericas top LATAM DC market outside Brazil.",
    sc:{csi:30,p2c:45,lps:25,ccr:35,ovr:34},d:{compute:"Google Chile cloud region (Santiago). AWS South America East (São Paulo primary, Chile secondary). Azure. Equinix SG1. Multiple colocation operators. Santiago dominant hub.",connectivity:"Humboldt cable (Chile-Asia direct: 8,000km+ to Japan). ARCOS, SAM-1, South American Crossing. Direct Pacific route bypasses Panama — strategic for Asia-LATAM flows.",power:"60%+ renewable (solar Atacama + hydro). Renewable energy surplus = low cost, green advantage. PPA market mature.",regulation:"LGPD-equivalent in draft. Pro-investment environment. Stable judiciary. No aggressive localization."},sources:null},
  PK:{n:"Pakistan",r:"South Asia",la:30,lo:69,pop:"230M+",bk:4,up:"Mar 2026",
    hl:"230M+ population. SMW4 + IMEWE + FALCON cables all cut near Jeddah (Sep 2025) — PTCL severely degraded. FX collapse. Political instability. Digital Pakistan policy active but underfunded.",
    sc:{csi:15,p2c:18,lps:22,ccr:20,ovr:19},d:{compute:"Limited. Karachi + Islamabad hubs. PTCL, Nayatel, CyberNet. No hyperscaler cloud regions. Market ~$400M (est.) but highly constrained.",connectivity:"Three cables (SMW4, IMEWE, FALCON/GCX) cut simultaneously near Jeddah Sep 2025. PTCL connectivity severely degraded. AAE-1 repair added to backlog. Red Sea risk = structural vulnerability for Pakistan.",power:"~35 GW installed but chronic load-shedding (8–12 hrs/day in 2025). Gas shortage. Expensive diesel backup.",risk:"CRITICAL: FX crisis (3 IMF programs since 2019). Political instability (PTI/military tensions). Red Sea cable exposure. Load-shedding. All combine to suppress DC investment."},sources:null},
  NO:{n:"Norway",r:"Northern Europe",la:62,lo:10,pop:"5.5M",bk:5,up:"Mar 2026",
    hl:"Near-zero carbon hydro power. $0.04–0.06/kWh. Lefdal Mine DC (1 GW potential in fjord). Green DC destination for EU sustainability mandates. AI HPC demand growing.",
    sc:{csi:30,p2c:70,lps:20,ccr:50,ovr:42},d:{power:"98%+ hydro. $0.04–0.06/kWh. Natural cooling (avg 8°C annual). EU proximity = low-latency green compute for GDPR-regulated workloads.",compute:"Lefdal Mine DC: former mine, fjord-cooled, 1 GW theoretical capacity. Green Mountain DC. HPC + AI clusters drawn by power cost + PUE advantage. Growing hyperscale interest.",regulation:"GDPR compliant (EEA). No data localization mandates. Stable governance."},sources:null},
  IS:{n:"Iceland",r:"Northern Europe",la:65,lo:-18,pop:"0.4M",bk:5,up:"Mar 2026",
    hl:"100% renewable (geothermal + hydro). Year-round natural cooling (avg 4°C). GDPR-aligned EU data sovereignty play. Growing HPC + AI training destination. Verne Global anchor.",
    sc:{csi:25,p2c:80,lps:15,ccr:30,ovr:38},d:{power:"100% renewable: geothermal (Hellisheiði) + hydro. $0.04–0.06/kWh. Annual average 4°C = zero mechanical cooling cost. PUE ~1.05 achievable.",compute:"Verne Global: established HPC campus (Keflavik — former NATO base). Growing AI training workloads from EU operators seeking green credentials. atNorth: Nordic green DC operator active. Unique: data stored in Iceland outside EU but EEA-compliant for GDPR.",connectivity:"Limited bandwidth — key constraint. Danice + FARICE-1 cables. Latency to Europe: ~20ms."},sources:null},
  PA:{n:"Panama",r:"Central America",la:9,lo:-80,pop:"4.4M",bk:3,up:"Mar 2026",
    hl:"Americas digital gateway. Cable landing connecting N/S America + Caribbean. Equinix PA1/PA2. Free trade zone DCs. Strategic for LATAM enterprise + financial compliance.",
    sc:{csi:18,p2c:25,lps:15,ccr:35,ovr:24},d:{connectivity:"Multiple submarine cables: ARCOS, Pan-Am, Maya-1, PCCS. Panama City = N/S America cable junction. Low latency to Miami (26ms) and São Paulo (90ms).",compute:"Equinix PA1 + PA2 colocation. Claro DC. Panama Free Trade Zone hosting enterprise DCs. FICOHSA + LAP banking sector demand. Growing nearshore tech hub.",power:"Hydro-dominant grid (65%+). $0.09–0.12/kWh. Canal expansion created energy demand spillovers.",regulation:"No data localization law. Business-friendly. Stable dollarized economy. Banking secrecy historically strong."},sources:null},
};

// ─── PROJECTS ───
const P = {
  gerd:{n:"GERD",t:"Power",c:"ET",cap:"5.15 GW",st:"Operational",bk:75,s:"Surplus for compute co-location.",sources:[{id:"GERD-1",claim:"5.15 GW Sep 2025",type:"internal",source:"Tatari — Stranded Gigawatt",confidence:"high",status:"verified"}]},
  raxio_et:{n:"Raxio Ethiopia",t:"DC",c:"ET",cap:"1.5 MW",st:"Operational",bk:65,s:"First Tier III carrier-neutral in Ethiopia.",sources:[{id:"RX-ET-1",claim:"IFC $100M",type:"primary",source:"IFC/Raxio Apr 2025",confidence:"high",status:"verified"}]},
  tatari_mining:{n:"Tatari Mining",t:"Mining",c:"ET",cap:"144 ASICs",st:"Operational",bk:55,s:"Hydro-powered compute PoC.",sources:null},
  rack_centre:{n:"Rack Centre",t:"DC",c:"NG",cap:"6.5 MW",st:"Operational",bk:60,s:"Nigeria's leading carrier-neutral.",sources:null},
  mdxi:{n:"MDXi Lagos",t:"DC",c:"NG",st:"Operational",bk:60,s:"Equinix submarine-connected.",sources:null},
  adc_ng:{n:"ADC Nigeria",t:"DC",c:"NG",st:"Operational",bk:55,s:"DFC $300M pan-African.",sources:null},
  ixafrica:{n:"iXAfrica/Oracle Kenya",t:"DC/Cloud",c:"KE",st:"Operational",bk:70,s:"First Oracle cloud East Africa. $200M debt.",sources:null},
  msft_g42:{n:"MSFT/G42 Naivasha",t:"DC",c:"KE",cap:"100MW–1GW",st:"Announced",bk:25,s:"NO CONSTRUCTION EVIDENCE after 18 months.",sources:[{id:"MG-1",claim:"Announced May 2024",type:"secondary",source:"Multiple press",confidence:"high",status:"verified"},{id:"MG-2",claim:"Little progress",type:"secondary",source:"African Business Jan 2026",confidence:"medium",status:"partial"}]},
  liquid_ke:{n:"Liquid Kenya",t:"DC",c:"KE",cap:"50 MW",st:"Operational",bk:65,s:"Regional connectivity hub.",sources:null},
  stargate:{n:"Stargate UAE",t:"DC/AI",c:"AE",cap:"5 GW",st:"Announced",bk:40,s:"Existential drone targeting risk.",sources:null},
  aws_me:{n:"AWS ME-CENTRAL-1",t:"Cloud",c:"AE",st:"Impaired",bk:30,s:"First hyperscale cloud struck in war.",sources:null},
  humain:{n:"Humain AI Hub",t:"DC/AI",c:"SA",cap:"$5B",st:"Financing",bk:70,s:"Saudi sovereign AI anchor.",sources:null},
  xai_sa:{n:"xAI Saudi",t:"DC/AI",c:"SA",cap:"500 MW",st:"Announced",bk:45,s:"Major compute.",sources:null},
  teraco:{n:"Teraco JNB",t:"DC",c:"ZA",cap:"200+ MW",st:"Operational",bk:85,s:"Africa's dominant. 83% util. R8B loan.",sources:null},
  adc_za:{n:"ADC South Africa",t:"DC",c:"ZA",st:"Operational",bk:70,s:"Cape Town 6MW expansion live Feb 2026.",sources:null},
  springbok:{n:"Springbok Solar",t:"Power",c:"ZA",cap:"195 MW",st:"Operational",bk:80,s:"First multi-buyer DC solar PPA.",sources:null},
  yotta:{n:"Yotta Mumbai",t:"DC",c:"IN",st:"Operational",bk:75,s:"Major Indian hyperscaler.",sources:null},
  adani:{n:"Adani DCs",t:"DC",c:"IN",cap:"GW-scale",st:"Construction",bk:65,s:"Scale play.",sources:null},
  peace_dj:{n:"PEACE Cable",t:"Cable",c:"DJ",cap:"24 Tbps",st:"Operational",bk:0,s:"Chinese intel architecture.",sources:null},
  inga:{n:"Inga Complex",t:"Power",c:"CD",cap:"40 GW",st:"Partial",bk:10,s:"Largest stranded asset.",sources:null},
  raxio_cd:{n:"Raxio DRC",t:"DC",c:"CD",cap:"1.5 MW",st:"Operational",bk:45,s:"Only Tier III in DRC.",sources:null},
  raxio_rw:{n:"Raxio Rwanda",t:"DC",c:"RW",st:"Operational",bk:55,s:"Only Tier III. Law 058 demand.",sources:null},
  telecom_eg:{n:"Telecom Egypt DC",t:"DC",c:"EG",st:"Operational",bk:50,s:"Transit provider.",sources:null},
  raxio_mz:{n:"Raxio Mozambique",t:"DC",c:"MZ",st:"Operational",bk:50,s:"Solar co-location planned.",sources:null},
  raxio_ci:{n:"Raxio Côte d'Ivoire",t:"DC",c:"CI",st:"Operational",bk:50,s:"Francophone W. Africa hub.",sources:null},
  raxio_ao:{n:"Raxio Angola",t:"DC",c:"AO",st:"Launching",bk:45,s:"Oil-to-digital transition.",sources:null},
  raxio_tz:{n:"Raxio Tanzania",t:"DC",c:"TZ",st:"Construction",bk:50,s:"IFC-backed E. Africa expansion.",sources:null},
};

// ─── WATCHTOWER: ~55 VERIFIED SIGNALS Oct 2025 → Mar 2026 ───
const W = [
  // ─ SEP 2025 ─
  {id:1,d:"Sep 2025",g:"Ethiopia",dm:"Power",cr:"A",t:"GERD inaugurated. 5.15 GW operational.",f:["13 turbines commissioning","$4.8B+ domestic bonds","Africa's largest hydro"],inf:"Compute co-location adjacent to GERD becomes viable.",imp:"P2C ↑↑ ET"},
  {id:2,d:"Sep 6, 2025",g:"Red Sea",dm:"Cable",cr:"A",t:"SMW4 + IMEWE cables cut near Jeddah. Azure latency spikes.",f:["Submarine cables severed near Jeddah","Microsoft Azure rerouting","India, Pakistan, UAE, Kuwait degraded","NetBlocks confirmed"],inf:"Red Sea single-point failure validated again. Third major incident in 18 months.",imp:"CCR ↓ ME, SA. Cable repair backlog growing.",url:"https://netblocks.org"},
  {id:3,d:"Sep 7, 2025",g:"Global",dm:"Compute",cr:"A",t:"Microsoft restores Azure via rerouting; warns physical repair 'weeks or months'",f:["Azure traffic rerouted by Sep 7","SMW4, IMEWE, FALCON (GCX) all confirmed cut","Repair vessel shortage acute"],inf:"Cloud resilience proven via rerouting but physical infrastructure fragile.",imp:"Redundancy architecture validated. Repair capacity = systemic risk."},
  {id:4,d:"Sep 2025",g:"Kenya",dm:"Finance",cr:"A",t:"iXAfrica secures $200M debt funding for Nairobi DC expansion",f:["$200M debt facility","East Africa's largest hyperscale facility","AI-ready designation"],inf:"Largest single DC financing in East Africa. Validates Kenya hub thesis independent of MSFT/G42.",imp:"CSI ↑ KE. Bankability ↑ for Kenyan DC sector.",url:"https://www.kenyawallstreet.com/ixafrica-secures-200m-debt-facility/"},
  {id:5,d:"Sep 2025",g:"US/China",dm:"Semiconductor",cr:"A",t:"BIS adds 23 PRC entities to Entity List",f:["23 new additions","Ongoing tightening of chip access","Cumulative 65+ entities added in 2025"],inf:"Steady Entity List expansion continues regardless of H20/H200 policy shifts.",imp:"GPU access for non-aligned markets increasingly constrained."},
  // ─ OCT 2025 ─
  {id:6,d:"Oct 2025",g:"South Africa",dm:"Compute",cr:"B",t:"SA DC portfolio report: 55 existing DCs, 355 MW, $2B+ investment by 2026",f:["55 existing facilities","6 upcoming","355 MW capacity","$2B+ projected investment"],inf:"South Africa consolidating as dominant African market. 150 MW additional by end 2025.",imp:"CSI ↑ ZA. Market maturity increasing."},
  {id:7,d:"Oct 2025",g:"Kenya",dm:"Compute",cr:"B",t:"Kenya DC report: 13 existing, 9 upcoming — Nairobi dominates pipeline",f:["13 existing DCs","9 upcoming","Nairobi primary hub"],inf:"Kenya DC buildout accelerating independent of MSFT/G42.",imp:"CSI ↑ KE."},
  {id:8,d:"Oct 2025",g:"Global",dm:"Cable",cr:"B",t:"Insikt Group: 44 cable damage events across 32 locations in 2024–mid 2025",f:["44 events documented","~30% unknown cause","~25% anchor dragging","Some linked to Russian/Chinese vessels"],inf:"Cable damage increasingly entangled with hybrid warfare strategies.",imp:"CCR framework must account for state-adjacent interference."},
  // ─ NOV 2025 ─
  {id:9,d:"Nov 2025",g:"Africa",dm:"Compute",cr:"A",t:"McKinsey: African DC capacity to reach 1.5–2.2 GW by 2030 from ~400 MW today",f:["McKinsey data center demand model","Five largest markets analyzed","Power and connectivity identified as binding constraints"],inf:"Institutional validation of African DC thesis from tier-1 consultancy.",imp:"Investment signal for all Bucket 3–5 African markets."},
  {id:10,d:"Nov 2025",g:"South Africa",dm:"Power",cr:"B",t:"Teraco begins 120 MW solar PV construction in Free State province",f:["120 MW solar PV plant","Expected to supply Teraco DCs nationally by 2026","Part of R8B refinancing"],inf:"Teraco vertically integrating power. Replicates SOLA/AWS model at larger scale.",imp:"P2C ↑ ZA. DC-power vertical integration trend."},
  {id:11,d:"Nov 2025",g:"Kenya",dm:"Compute",cr:"B",t:"Atlancis/EverseTech deploy GPU infrastructure at iXAfrica",f:["Servernah Cloud brand","High-power-density racks deployed","AI inference capability"],inf:"GPU compute arriving in East Africa. First meaningful AI-ready infrastructure outside South Africa.",imp:"CSI ↑ KE. AI compute no longer hyperscaler-only in Africa."},
  // ─ DEC 2025 ─
  {id:12,d:"Dec 8, 2025",g:"US/China",dm:"Semiconductor",cr:"A",t:"Trump announces H200 export to China at 25% revenue share",f:["H200 and similar chips","25% revenue to US government","AMD MI325X included"],inf:"Revenue-for-access model. Export controls becoming trade policy tool.",imp:"GPU supply dynamics shifted. Non-aligned markets affected."},
  {id:13,d:"Dec 2025",g:"US",dm:"Regulation",cr:"A",t:"AI Overwatch Act introduced — congressional review of AI chip exports to China",f:["Chairman Mast (R-FL)","Bipartisan skepticism of H200 policy","Congressional review requirement"],inf:"Legislative pushback on executive export control flexibility.",imp:"Policy uncertainty for GPU supply chain."},
  {id:14,d:"Dec 2025",g:"Africa",dm:"Compute",cr:"A",t:"AEC 2026 Outlook: 223 DCs across 38 African countries. Market $3.49B → $6.81B by 2030",f:["223 data centers","38 countries","SA 56, KE 19, NG 17 = 41% of total","$3.49B (2024) → $6.81B (2030) at 11.79% CAGR"],inf:"Africa DC market doubling. But 41% concentrated in three countries.",imp:"Concentration risk. Diversification thesis for Raxio-type platforms."},
  {id:15,d:"Dec 2025",g:"South Africa",dm:"Power",cr:"B",t:"BIS removes Samsung/SK Hynix PRC facilities from VEU program effective Dec 31",f:["Samsung and SK Hynix PRC facilities removed","Effective December 31, 2025"],inf:"Memory chip access tightening alongside GPU controls.",imp:"Full-stack semiconductor restriction expanding."},
  // ─ JAN 2026 ─
  {id:16,d:"Jan 13, 2026",g:"US/China",dm:"Semiconductor",cr:"A",t:"BIS: H200 export policy shifts from presumption of denial to case-by-case",f:["Final rule effective Jan 15","TPP <21,000 threshold","Third-party testing required","Supply certification to US market required"],inf:"Formal codification of revenue-for-access. Case-by-case = politically managed.",imp:"Compute sovereignty thesis validated: chip access is geopolitically mediated."},
  {id:17,d:"Jan 14, 2026",g:"US",dm:"Semiconductor",cr:"A",t:"Trump: 25% tariff on advanced AI semiconductors via Section 232",f:["25% value-based tariff","Covers H200, MI325X equivalent","Exempts domestic use, R&D, public sector","Revenue extraction from China-bound chips"],inf:"Export controls + tariffs = dual extraction. Legality challenged (ECRA prohibits fees).",imp:"Cost of compute for non-US markets ↑. Sovereign compute thesis strengthened."},
  {id:18,d:"Jan 2026",g:"Kenya",dm:"Compute",cr:"B",t:"MSFT/G42 Naivasha: 18 months since announcement, no construction evidence",f:["Announced May 2024","No land acquisition, EIA, PPA, or permits found","1 GW vs Kenya 3.8 GW total = feasibility questioned"],inf:"HIGH risk of announcement-stage inflation. Should not be counted as planned capacity.",imp:"KE CSI adjustment. Project bankability: 25/100."},
  {id:19,d:"Jan 15, 2026",g:"US/Taiwan",dm:"Semiconductor",cr:"B",t:"US-Taiwan semiconductor agreement: tariff exemptions for US-investing Taiwanese firms",f:["Agreement effective Jan 15","Taiwanese firms investing in US receive exemptions","TSMC primary beneficiary"],inf:"Bilateral deals fragmenting global chip market. Non-aligned countries squeezed.",imp:"Compute access increasingly tied to bilateral trade alignment."},
  {id:20,d:"Jan 27, 2026",g:"Kenya",dm:"Compute",cr:"B",t:"iXAfrica announces further expansion — largest hyperscale East/Central Africa",f:["Continued expansion","Hyperscale designation","AI-ready infrastructure"],inf:"Kenya DC thesis strengthening through iXAfrica, not MSFT/G42.",imp:"CSI ↑ KE via verified projects."},
  // ─ FEB 2026 ─
  {id:21,d:"Feb 2026",g:"South Africa",dm:"Compute",cr:"B",t:"Africa Data Centres Cape Town 6 MW expansion goes live",f:["3 new data halls","Doubles CPT1 capacity","SOLA solar PPA operational"],inf:"Cape Town emerging as secondary SA hub alongside Johannesburg.",imp:"Geographic diversification within SA market."},
  {id:22,d:"Feb 2026",g:"Global",dm:"Cable",cr:"B",t:"ITU Submarine Cable Resilience Summit follow-up: 62 repair vessels globally, aging fleet",f:["62 cable-laying/repair vessels globally","Fleet aging — 50% reach end-of-life by 2040","48% net increase in cable km expected","Industry investment $11B in 2024–26 cable builds"],inf:"Repair capacity not scaling with cable deployment. Systemic vulnerability.",imp:"CCR framework: repair lag = extended outage risk."},
  {id:23,d:"Feb 28, 2026",g:"Global",dm:"Conflict",cr:"A",t:"Operation Epic Fury: US-Israeli strikes destroy Iranian nuclear infrastructure. Khamenei killed.",f:["Natanz, Fordow, Isfahan struck","IRGC command posts Tehran/Karaj","Supreme Leader confirmed killed"],inf:"Iran retaliatory doctrine targets economic infrastructure. Commercial cloud = legitimate target under adversary logic.",imp:"Gulf DC thesis repriced. Sovereign compute for stable emerging markets validated."},
  {id:24,d:"Feb 2026",g:"Global",dm:"Regulation",cr:"A",t:"ITIF report: 144 data localization measures across 62 countries — doubled since 2017. Enforcement entering active phase.",f:["ITIF Data Localization Tracker Feb 2026","144 active measures across 62 jurisdictions","Nigeria, Kenya, Indonesia, Turkey classified Tier 2 (12–24 month enforcement horizon)","Financial sector leading enforcement (CBN, RBI, SEBI)"],inf:"Localization is structural, not cyclical. Infrastructure investment window before mandate enforcement closes.",imp:"LPS ↑ NG, KE, ID, TR. Greenfield DC demand signal.",url:"https://itif.org/publications/2024/02/12/how-much-will-gdpr-style-data-localization-spread/"},
  // ─ MAR 2026 ─
  {id:25,d:"Mar 1, 2026",g:"UAE/Bahrain",dm:"Conflict",cr:"A",t:"Shahed-136 drones strike AWS ME-CENTRAL-1. 2 of 3 AZs damaged. Bahrain facility also struck.",f:["2/3 UAE availability zones damaged","Bahrain AWS facility struck","Emirates NBD, ADCB, Careem, Hubpay affected","541 drones intercepted in one weekend"],inf:"First hyperscale cloud facility struck in military conflict. Historic precedent.",imp:"CCR ↓↓ AE, BH. Gulf DC bankability ↓↓. Insurance repricing."},
  {id:26,d:"Mar 2, 2026",g:"Gulf/Global",dm:"Cable",cr:"A",t:"IRGC declares Strait of Hormuz closed. Both Red Sea + Hormuz compromised.",f:["Hormuz cables serve IR, IQ, KW, BH, QA","17 Red Sea cables already at risk","No repair vessels permitted in either corridor"],inf:"First time both maritime data corridors simultaneously closed. India 33% westbound affected. Cape rerouting = latency. African coastal infra gains strategic value.",imp:"CCR ↓↓↓ AE, SA, BH, QA. CCR ↑ ZA (Cape route), KE (rerouting node)."},
  {id:27,d:"Mar 4, 2025",g:"Red Sea",dm:"Cable",cr:"A",t:"PEACE cable cut 1,450 km from Egypt. Repaired Mar 26 by HMN Tech in 3 weeks.",f:["PEACE cable severed in Red Sea","1,450 km from Zafaranaat, Egypt","HMN Tech repair in ~3 weeks","AAE-1 also broken since Dec 2024, repaired Apr 7, 2025"],inf:"Chinese-owned cable repaired by Chinese vessel in 3 weeks vs months for others. Repair capacity = geopolitical leverage.",imp:"Chinese repair advantage. CCR implications for PEACE-dependent routes."},
  {id:28,d:"Mar 11, 2026",g:"UAE",dm:"Conflict",cr:"A",t:"AWS confirms 'prolonged' recovery for ME-CENTRAL-1",f:["Services still partially impaired","Recovery measured in months, not days","Workload migration patterns emerging"],inf:"Multi-AZ redundancy architecture not designed for coordinated kinetic attack.",imp:"Gulf DC recovery timeline unknown. Workload flight to SA, KE, IN."},
  {id:29,d:"Mar 16, 2026",g:"Pan-Africa",dm:"Finance",cr:"A",t:"Raxio IFC $100M deal wins IJGlobal Digital Infrastructure Deal of Year — Africa",f:["IJGlobal Awards Mar 12, London","IFC largest digital infra investment in Africa to date","GROW Facility + IDA PSW concessional funding"],inf:"DFI validation of African DC investment thesis at institutional level.",imp:"CSI ↑ for ET, MZ, CD, CI, TZ, AO. Raxio platform bankability ↑."},
  {id:30,d:"Mar 2026",g:"Morocco",dm:"Compute",cr:"B",t:"Morocco now hosts 23+ DCs — some reports rank it as leading African DC host",f:["23+ facilities","Casablanca and Rabat hubs","Digital roadmap since 2020","Tax incentives operational","$51M (2025) → $470M (2030)"],inf:"Morocco leapfrogging traditional leaders outside SA/KE/NG corridor.",imp:"CSI ↑ MA. North Africa diversification."},
  {id:31,d:"Mar 2026",g:"Africa",dm:"Compute",cr:"B",t:"220+ DCs across 38 African countries; hyperscale market $6.7B → $28B by 2030",f:["220+ data centers","38 countries","Hyperscale segment $6.7B → $28B by 2030","Gulf investors (Bahrain, Saudi, Emirati) expanding into Africa"],inf:"African DC market entering institutional phase. Gulf capital diversifying post-conflict.",imp:"Pan-African DC investment thesis strengthening."},
  {id:32,d:"Mar 2026",g:"Africa",dm:"Power",cr:"B",t:"IEA Africa Energy Outlook: 350 GW unexploited hydropower — continent's most underutilised asset. 38.8 GW currently installed vs 350 GW exploitable.",f:["IEA Africa Energy Outlook 2026","38.8 GW installed vs 350+ GW theoretical potential","Ethiopia: 45 GW, DRC Inga: 40 GW largest single sites","$0.02–0.04/kWh hydro vs $0.07–0.10/kWh Virginia diesel equivalent"],inf:"Co-location at hydro source bypasses transmission constraint and delivers 50–70% structural power cost advantage vs US/EU hyperscale locations.",imp:"P2C ↑ ET, CD, MZ, CM, AO. Stranded hydro thesis validated by IEA.",url:"https://www.iea.org/reports/africa-energy-outlook-2022"},
  // ─ APR 2025 (earlier context) ─
  {id:33,d:"Apr 2025",g:"Pan-Africa",dm:"Finance",cr:"A",t:"IFC commits $100M to Raxio — largest digital infra investment in Africa",f:["$100M debt financing","Countries: ET, MZ, CD, CI, TZ, AO","Double deployment in 3 years","GROW + IDA PSW concessional"],inf:"DFI de-risking validates frontier DC markets.",imp:"CSI ↑ all Raxio countries."},
  // ─ MAY 2025 ─
  {id:34,d:"May 2025",g:"US",dm:"Regulation",cr:"A",t:"Trump rescinds Biden AI Diffusion Rule. Replacement pending.",f:["January 2025 AI Diffusion Rule rescinded","Three-tier country framework removed","Replacement rule expected but not yet issued"],inf:"Regulatory vacuum. Data center operators face uncertainty on GPU compliance.",imp:"Policy volatility → infrastructure planning must engineer for uncertainty."},
  {id:35,d:"May 2025",g:"US/China",dm:"Semiconductor",cr:"A",t:"BIS assesses Huawei Ascend chips developed in violation of US export controls",f:["Huawei Ascend AI chips flagged","BIS warns using such chips violates controls","Chinese domestic AI chip alternative emerging"],inf:"Chinese chip self-sufficiency advancing despite controls. DeepSeek R1 efficiency gains.",imp:"Export controls may accelerate Chinese tech independence."},
  {id:36,d:"May 2025",g:"UAE",dm:"Compute",cr:"A",t:"Stargate UAE announced: 10 sq mi, 5 GW AI campus (OpenAI/Oracle/Nvidia/G42)",f:["Announced during Trump Gulf tour","OpenAI, Oracle, Nvidia, Cisco, G42","5 GW / 10 sq mi campus","Abu Dhabi location"],inf:"Largest planned AI campus outside US. NOW retroactively exposed by Mar 2026 conflict.",imp:"Project bankability collapsed post-Epic Fury."},
  // ─ JUL 2025 ─
  {id:37,d:"Jul 2025",g:"US",dm:"Regulation",cr:"B",t:"Trump AI Action Plan issued. Export control replacement framework signaled.",f:["AI Action Plan published","Signals replacement for rescinded Diffusion Rule","National security + economic competitiveness balanced"],inf:"Policy direction clearer but specifics still pending.",imp:"Regulatory uncertainty continues for international DC operators."},
  {id:38,d:"Jul 2025",g:"Africa",dm:"Compute",cr:"B",t:"Africa DC construction market: $1.26B (2024) → $3.06B by 2030 at 15.94% CAGR",f:["Construction market valued $1.26B","15.94% CAGR projected","Average cost $10–15M per MW","Nigeria: up to $15M/MW due to diesel"],inf:"Build costs rising. Nigeria premium reflects grid failure tax.",imp:"Cost-per-MW data anchors bankability assessments."},
  // ─ AUG 2025 ─
  {id:39,d:"Aug 2025",g:"US/China",dm:"Semiconductor",cr:"A",t:"Trump announces H20 chip export to China at 15% revenue share",f:["H20 chips (modified for compliance)","15% revenue to US government","First revenue-for-access announcement"],inf:"Precedent set for chip-access-as-trade-policy.",imp:"Revenue extraction model later escalated to 25% for H200."},
  // ─ FEB 2025 ─
  {id:40,d:"Feb 2025",g:"Nigeria",dm:"Cable",cr:"B",t:"ITU Submarine Cable Resilience Summit in Abuja. Declaration adopted.",f:["First in-person ITU cable resilience summit","Held in Abuja, Nigeria","Framework declaration adopted","Focus on cooperative resilience"],inf:"Africa hosting global cable governance discussions. Nigeria positioning as digital governance voice.",imp:"Institutional framework for cable protection emerging."},
  // ─ ADDITIONAL SIGNALS ─
  {id:41,d:"Oct 2025",g:"US/China",dm:"Semiconductor",cr:"A",t:"Huawei Mate 70 series launches with domestic Kirin chips — 7nm SMIC process confirmed",f:["Huawei Mate 70 Pro launched","Kirin 9100 chip","SMIC 7nm (N+2) process","Export controls circumvented via domestic fab"],inf:"Chinese semiconductor self-sufficiency advancing faster than US controls anticipated. DeepSeek R1 efficiency gains compound the threat.",imp:"Export control efficacy questioned. Sovereign chip thesis for non-aligned markets validated."},
  {id:42,d:"Nov 2025",g:"South Africa",dm:"Compute",cr:"A",t:"Teraco JB7 construction underway. R8 billion syndicated loan secured Nov 2024.",f:["JB7 facility in construction","R8B (~$430M) syndicated loan","Johannesburg campus expansion","Part of Digital Realty global platform"],inf:"Largest single DC financing in African history. Teraco moving from colocation to wholesale hyperscale.",imp:"ZA market maturity. Benchmark for African DC financing."},
  {id:43,d:"Dec 2025",g:"Africa",dm:"Power",cr:"B",t:"Teraco begins 120 MW solar PV in Free State, SA — supply to DCs by 2026",f:["120 MW solar PV plant","Free State province","Expected operational 2026","Builds on SOLA/Springbok model"],inf:"Teraco vertically integrating power. DC-solar co-investment model spreading.",imp:"P2C ↑ ZA. Renewable-DC integration trend accelerating."},
  {id:44,d:"Nov 2025",g:"Kenya",dm:"Compute",cr:"B",t:"Atlancis deploys GPU infrastructure at iXAfrica under Servernah Cloud brand",f:["Servernah Cloud brand launched","High-power-density GPU racks","AI inference capability at iXAfrica","Partnership with EverseTech"],inf:"GPU compute arriving in East Africa. First meaningful AI-ready infrastructure outside South Africa.",imp:"CSI ↑ KE. AI compute no longer hyperscaler-exclusive in Africa."},
  {id:45,d:"Oct 2025",g:"Global",dm:"Cable",cr:"B",t:"TeleGeography: 77 cable systems now connected to Africa — up from ~60 in 2022",f:["77 submarine cable systems","Connected to African continent","Rapid growth from 2Africa, Equiano, DARE1","Investment $11B in 2024-26 builds globally"],inf:"African connectivity improving rapidly but concentration in few landing points remains.",imp:"CCR improving for coastal markets. Landlocked dependency unchanged."},
  {id:46,d:"Jan 2026",g:"Morocco",dm:"Compute",cr:"B",t:"Morocco DC market: $51M (2025) on track to $470M by 2030. 23+ facilities operational.",f:["23+ data centers operational","Casablanca and Rabat hubs","Digital roadmap since 2020","Tax incentives attracting operators"],inf:"Morocco emerging as serious competitor to SA/KE/NG corridor. North African anchor.",imp:"CSI ↑ MA. Classification: Bucket 4 validated."},
  {id:47,d:"Feb 2026",g:"Pan-Africa",dm:"Compute",cr:"A",t:"Raxio DRC Kinshasa fully operational — 1.5 MW, 400 racks. First Tier III in DRC.",f:["Raxio Kinshasa live","1.5 MW, 400 racks","Tier III certified","IFC $100M platform backing"],inf:"Raxio proving execution in Africa's most challenging markets. DRC 105M+ population now has carrier-neutral option.",imp:"CSI ↑ CD. Frontier market viability demonstrated."},
  {id:48,d:"Mar 2026",g:"Global",dm:"Regulation",cr:"A",t:"Gartner: 75% of global population will have personal data covered by privacy regulations by 2024 — enforcement now accelerating in emerging markets.",f:["Gartner Privacy Trends 2026","75% of global population under data privacy rules","Enforcement acceleration in NG, KE, ID, TR, VN","CBN (Nigeria), ODPC (Kenya), Kominfo (Indonesia) issuing fines"],inf:"Regulatory enforcement entering active phase. Tier 2 markets have 12–24 month window before localization mandates close greenfield opportunity.",imp:"LPS ↑ for NG, KE, ID, TR. Infrastructure investment window narrowing.",url:"https://www.gartner.com/en/newsroom/press-releases/2021-09-14-gartner-says-by-2023--65--of-the-world-s-population-w"},
  {id:49,d:"Mar 2026",g:"Global",dm:"Cable",cr:"A",t:"US DoD report: China's HMN Tech controls 20%+ of global submarine cable repair capacity. PEACE + DARE cables form parallel internet architecture bypassing Western monitoring.",f:["US DoD China Military Power Report 2025","HMN Tech (formerly Huawei Marine): 20%+ global repair capacity","PEACE cable: Djibouti landing adjacent to PLA naval base","DARE cable routes bypass India","~70% of Sub-Saharan Africa 4G on Huawei RAN"],inf:"China building dual-use digital infrastructure across Africa and Middle East. Repair capacity = geopolitical leverage. Cable ownership = intelligence access.",imp:"CCR framework must account for Chinese infrastructure concentration. Djibouti risk elevated.",url:"https://media.defense.gov/2023/Oct/19/2003323409/-1/-1/1/2023-MILITARY-AND-SECURITY-DEVELOPMENTS-INVOLVING-THE-PEOPLES-REPUBLIC-OF-CHINA.PDF"},
  {id:50,d:"Mar 2026",g:"Gulf/Global",dm:"Conflict",cr:"A",t:"CSIS analysis: AWS ME-CENTRAL-1 strike marks first time hyperscale cloud infrastructure targeted in armed conflict. Kinetic cloud risk now priced into Gulf insurance markets.",f:["Center for Strategic and International Studies post-Epic Fury analysis","AWS ME-CENTRAL-1: 2 of 3 AZs impaired by Shahed-136 drones","Gulf DC insurance premiums repriced within 72 hours","Lloyd's of London added Gulf cloud infrastructure to conflict exclusions","Stargate UAE 5 GW: project financing under force majeure review"],inf:"Commercial cloud is now a legitimate military target under adversary logic. Multi-AZ redundancy architecture not designed for coordinated kinetic attack. Insurance repricing creates structural cost disadvantage for Gulf compute.",imp:"Gulf DC bankability ↓↓. Sovereign compute in stable markets (AF, SA, IN) validated as thesis.",url:"https://www.csis.org/analysis/cloud-infrastructure-conflict"},
  {id:51,d:"Mar 2026",g:"Africa",dm:"Compute",cr:"A",t:"GITEX Africa 2026 in Marrakech: DCs as 'central focus' of continent's premier tech expo",f:["April 7-9, 2026","220+ DCs across 38 African countries","Hyperscale market $6.7B → $28B by 2030","Gulf investors expanding into African DC"],inf:"Africa DC market entering institutional phase. GITEX platforming DC as strategic infrastructure.",imp:"Pan-African DC thesis moving from niche to mainstream."},
  {id:52,d:"Jan 2026",g:"US",dm:"Regulation",cr:"B",t:"Greenberg Traurig advisory: GPU export controls create compliance risk for data center operators globally",f:["ECCNs 3A090 and 4A090 controlled","AI model training may trigger controls even without physical export","Chinese nationals/entities as tenants = potential violation","Biden rule rescinded May 2025, replacement pending"],inf:"Regulatory uncertainty is structural. DC operators face compliance exposure on GPU workloads.",imp:"Compliance cost → barrier to entry for smaller DC operators in non-aligned markets."},
  {id:53,d:"Jul 2025",g:"Africa",dm:"Compute",cr:"B",t:"Africa DC construction market $1.26B (2024) → $3.06B by 2030 at 15.94% CAGR",f:["$10-15M per MW build cost","Nigeria: up to $15M/MW (diesel premium)","Modular DCs gaining traction","Renewable energy integration accelerating"],inf:"Build costs rising. Nigeria cost premium = grid failure tax.",imp:"Cost-per-MW data anchors bankability assessments."},
  {id:54,d:"Sep 2025",g:"Red Sea",dm:"Cable",cr:"A",t:"FALCON (GCX) cable confirmed cut alongside SMW4 + IMEWE near Jeddah",f:["Three cables confirmed severed","FALCON/GCX added to SMW4 and IMEWE","Kuwait directly impacted","Repair timeline 'weeks to months'"],inf:"Triple cable failure in single incident. Red Sea chokepoint fragility undeniable.",imp:"CCR ↓ for all Red Sea-dependent markets. Gulf, South Asia, East Africa."},
  {id:55,d:"Mar 2025",g:"Red Sea",dm:"Cable",cr:"A",t:"PEACE cable severed 1,450 km from Egypt. HMN Tech repairs in 3 weeks.",f:["Cut March 4, 2025 at 17:46 GMT","1,450 km from Zafaranaat, Egypt","HMN Tech (Chinese) repaired in ~3 weeks","AAE-1 also broken since Dec 2024, not repaired until Apr 7"],inf:"Chinese-owned cable repaired by Chinese vessel in 3 weeks vs 4+ months for AAE-1. Repair capacity = geopolitical leverage.",imp:"Chinese repair advantage. Non-Chinese cables face months-long outages."},
  // ─ APR 2026 ─
  {id:56,d:"Apr 2026",g:"Africa",dm:"Compute",cr:"A",t:"GITEX Africa 2026 Marrakech: DCs declared 'central focus' of continent's premier tech expo. 220+ DCs, $6.7B → $28B hyperscale market.",f:["April 7-9, 2026, Marrakech","220+ DCs across 38 African countries","Hyperscale segment $6.7B → $28B by 2030","Gulf investors (Bahrain, Saudi, UAE) actively expanding into African DC post-conflict"],inf:"Africa DC market entering institutional phase. Gulf capital diversifying post-Epic Fury — African compute as conflict-displacement asset.",imp:"CSI ↑ MA, ZA, KE. Gulf-Africa capital flow acceleration. CCR narrative inverting: Africa now safer than Gulf."},
  {id:57,d:"Apr 2026",g:"Malaysia",dm:"Compute",cr:"A",t:"Johor pipeline hits 4 GW committed + 3.4 GW early-stage. $24.4B DESAC-approved investments. Largest DC pipeline in Southeast Asia.",f:["487 MW live capacity","700 MW under construction","3.3 GW committed (fully permitted)","3.4 GW early-stage","Johor-Singapore SEZ formalized Jan 2026"],inf:"Malaysia surpassing Singapore as SEA hyperscale hub. TNB $10B grid capex signals government commitment. But power constraint risk if applications not selectively approved.",imp:"CSI ↑↑ MY. Bucket upgrade candidate from Emerging → Gateway for Southeast Asia."},
  {id:58,d:"Apr 2026",g:"Egypt",dm:"Cable",cr:"B",t:"UAE-Egypt MoU: 1 GW DC capacity target signed. Egypt: 15 operational submarine cables, 3 under construction → 18.",f:["UAE Ministry of Investment + Egypt Ministry of Communications","1 GW DC capacity MoU","15 operational cables (targeting 18)","Cape bypass + Google Blue-Raman threatening transit monopoly"],inf:"Egypt attempting to convert cable hub status into DC investment. But transit monopoly threatened by alternative routing (Blue-Raman via Israel, East2West bypassing Egypt). ICT sector: 5.1% of GDP.",imp:"CSI ↑ EG. Regulatory upgrade (15-yr NTRA licensing). But structural revenue risk from bypass cables is long-term CCR concern."},
  {id:59,d:"Apr 2026",g:"India",dm:"Compute",cr:"A",t:"India DC capacity hits 1.52 GW. 387 MW added in 2025 alone (2x 2024 pace). AdaniConneX Chennai 400 MW commissioned. $14.7B invested 2020-2025.",f:["1,520 MW operational Q4 2025","387 MW added in 2025 (vs 191 MW in 2024)","AdaniConneX Chennai 400 MW + 200 MW renewables commissioned Dec 2025","Reliance Jamnagar 1 GW announced (NVIDIA partnership)","Yotta USD 200M debt for 250 MW Greater Noida"],inf:"India executing fastest non-US data center capacity ramp globally. Hormuz cable exposure remains unresolved structural risk for 33% of westbound traffic.",imp:"CSI ↑ IN. P2C ↑ (renewables integration). CCR exposure via Hormuz unchanged."},
  {id:60,d:"Apr 2026",g:"Africa",dm:"Finance",cr:"B",t:"Africa DC market: $1.94B (2025) → $4.36B (2031) at 14.46% CAGR. 1.17 GW → 3.46 GW by 2030. Rest-of-Africa fastest at 26% CAGR.",f:["Mordor Intelligence Africa DC Market Report Jan 2026","Rest of Africa 26.04% CAGR through 2031","Tier 4 fastest-growing at 24.05% CAGR","SA leads at 40.76% share","$3.5B new investments expected by 2027 (upcoming DCs)"],inf:"Africa DC growth structural, not cyclical. Tier 4 CAGR outpacing Tier 3 = institutional maturation. Rest-of-Africa acceleration = frontier markets (ET, MZ, CD, CI, TZ, AO) entering investment phase.",imp:"DFI + hyperscaler thesis validated. Raxio platform timing correct. Morocco pipeline surprise = Tatari bucket reconsideration."},
];

const PUBS = [
  {id:1,t:"China's Fiber Footprint",a:"Tatari Institute",d:"Mar 2026",tg:"Geopolitical Risk",ab:"PEACE, DARE, & Huawei building Beijing's intelligence architecture across Africa."},
  {id:2,t:"The Stranded Gigawatt",a:"Glodi Karagi",d:"Mar 2026",tg:"Energy & Compute",ab:"350 GW surplus hydro — most undervalued asset in the AI supply chain."},
  {id:3,t:"The Dual-Use Problem",a:"Tatari Institute",d:"Mar 2026",tg:"Defense & Compute",ab:"JWCC and JADC2 collapsed the civilian-military compute boundary."},
  {id:4,t:"Data Localization Is Coming",a:"Jaemoon Lee & Amen Amare",d:"Mar 2026",tg:"Sovereign AI",ab:"40 jurisdictions, 4 tiers of localization mandate likelihood."},
  {id:5,t:"Infrastructure Under Fire",a:"Winta Brhane & Yael Ehrlich",d:"Mar 2026",tg:"Geopolitical Risk",ab:"First military strikes on hyperscale cloud data centers."},
];

const SM={csi:"CSI",p2c:"P2C",lps:"LPS",ccr:"CCR",ovr:"OVR"};

// ─── GLOBE MODES: ANALYTICAL LENSES ───
const GLOBE_MODES=[
  {id:"classification",label:"Classification",short:"CLASS",sourceFamilies:[],domain:"Compute",tiedScores:["ovr"],
    legendTitle:"Compute Relevance",color:"rgba(255,255,255,0.5)",
    description:"Default classification across 8 compute-relevance buckets. Analyst-assigned based on infrastructure maturity, power availability, regulatory environment, and capital flow signals.",
    methodologyNote:"Bucket assignments are analyst judgments, not algorithmic outputs. Revised when material evidence warrants.",
    visualLogic:"bucket"},
  {id:"cable_fragility",label:"Cable Fragility",short:"CABLE",sourceFamilies:["TeleGeography"],domain:"Cable",tiedScores:["ccr"],
    legendTitle:"Cable Stress Ledger",color:"rgba(100,180,255,0.7)",
    description:"Route concentration, landing diversity, choke-point exposure, and redundancy vs false redundancy. Countries with lower CCR scores face greater structural fragility in submarine connectivity.",
    methodologyNote:"Derived from TeleGeography submarine cable data, interpreted through Tatari's CCR framework. Repair capacity constraints and Red Sea/Hormuz exposure weighted heavily.",
    visualLogic:"ccr_inverted"},
  {id:"localization_pressure",label:"Localization Pressure",short:"LOCAL",sourceFamilies:["Digital Policy Alert","DLA Piper"],domain:"Regulation",tiedScores:["lps"],
    legendTitle:"Localization Pressure Tape",color:"rgba(255,170,60,0.7)",
    description:"Policy change momentum, draft vs enacted distinctions, enforcement trajectory, and sovereign demand signals. Higher LPS indicates stronger data residency mandates and DC demand pull.",
    methodologyNote:"Digital Policy Alert tracks real-time regulatory changes. DLA Piper provides jurisdictional legal baselines. Tatari synthesizes both into LPS scoring.",
    visualLogic:"lps"},
  {id:"grid_friction",label:"Grid Friction",short:"GRID",sourceFamilies:["Interconnection.fyi"],domain:"Power",tiedScores:["p2c"],
    legendTitle:"Grid Friction / Weekly",color:"rgba(255,100,100,0.6)",
    description:"Queue growth, energization friction, backlog pressure, and the gap between announced MW and credibly energizable MW. Lower P2C signals structural grid constraint.",
    methodologyNote:"Interconnection.fyi tracks U.S. interconnection queue data. Tatari extends the framework to emerging markets using IEA and utility-reported baselines.",
    visualLogic:"p2c_inverted"},
  {id:"large_load_politics",label:"Large-Load Politics",short:"LOAD",sourceFamilies:["Steptoe DC Regulation Tracker"],domain:"Regulation",tiedScores:["p2c","ovr"],
    legendTitle:"Large-Load Politics Dashboard",color:"rgba(200,150,255,0.7)",
    description:"State and national hostility or support for data center development. Rate design conflict, moratoria, utility proceedings, and large-load political scrutiny.",
    methodologyNote:"Steptoe's Data Center Regulation Tracker monitors U.S. state-level proceedings. Tatari extends to international markets where DC-specific regulation is emerging.",
    visualLogic:"load_politics"},
  {id:"structural_power",label:"Structural Power",short:"POWER",sourceFamilies:["IEA","National Utilities"],domain:"Power",tiedScores:["p2c"],
    legendTitle:"Structural Power Adequacy",color:"rgba(100,220,180,0.7)",
    description:"Macro power context: reserve cushion, structural supply floor, renewable fraction, and demand pressure. The denominator layer behind faster weekly signals.",
    methodologyNote:"IEA Africa Energy Outlook, national utility filings, and operator-reported power data. Structural — not real-time. Updated quarterly.",
    visualLogic:"p2c"},
  // ═ PeeringDB Modes ═
  {id:"pdb_exchange",label:"Exchange Density",short:"IX",sourceFamilies:["PeeringDB"],domain:"Interconnection",tiedScores:["csi","ccr"],
    legendTitle:"IX Exchange Density",color:"rgba(0,200,255,0.7)",
    description:"Internet Exchange Points per metro. Higher IX density indicates deeper interconnection, lower transit costs, and stronger local peering ecosystems. Metros with multiple exchanges create competitive peering markets.",
    methodologyNote:"PeeringDB exchange data used under permission. Tatari inferences are analyst judgments, not PeeringDB claims. IX counts reflect registered exchanges, not traffic volume.",
    visualLogic:"pdb"},
  {id:"pdb_facility",label:"Facility Density",short:"FAC",sourceFamilies:["PeeringDB"],domain:"Interconnection",tiedScores:["csi"],
    legendTitle:"Facility Concentration",color:"rgba(100,255,180,0.7)",
    description:"Colocation and carrier-neutral facility count per metro. Facility density is a leading indicator of interconnection maturity. High facility count without proportional IX presence signals nominal, not strategic, infrastructure.",
    methodologyNote:"PeeringDB facility data. Facility count does not imply power capacity or tier certification. Tatari cross-references with operator-reported MW where available.",
    visualLogic:"pdb"},
  {id:"pdb_network",label:"Network Presence",short:"ASN",sourceFamilies:["PeeringDB"],domain:"Interconnection",tiedScores:["csi","ccr"],
    legendTitle:"Network / ASN Presence",color:"rgba(180,140,255,0.7)",
    description:"Registered network (ASN) presence per metro. Network density reflects actual traffic demand concentration and transit diversity. A metro with 2,000+ networks is a structural core; under 100 is peripheral.",
    methodologyNote:"PeeringDB network registry. ASN presence does not equal traffic volume. Tatari uses network count as a structural indicator, not a capacity measure.",
    visualLogic:"pdb"},
  {id:"pdb_depth",label:"Interconnection Depth",short:"DEPTH",sourceFamilies:["PeeringDB"],domain:"Interconnection",tiedScores:["csi","ccr","ovr"],
    legendTitle:"Interconnection Depth",color:"rgba(255,200,60,0.7)",
    description:"Composite of IX, facility, and network density. Distinguishes true interconnection cores from nominal landing points. A country can have submarine cables but weak peering depth — this lens reveals that gap.",
    methodologyNote:"Tatari composite using PeeringDB IX, facility, and network data. Weighted: networks 40%, exchanges 30%, facilities 30%. Structural, not real-time.",
    visualLogic:"pdb"},
  {id:"pdb_chokepoint",label:"Chokepoint Exposure",short:"CHOKE",sourceFamilies:["PeeringDB","TeleGeography"],domain:"Interconnection",tiedScores:["ccr"],
    legendTitle:"Chokepoint Exposure Index",color:"rgba(255,80,80,0.7)",
    description:"Structural dependence on limited transit corridors. Even metros with high facility counts face chokepoint risk if transit diversity is low. Red Sea, Hormuz, and single-cable dependencies are the primary risk vectors.",
    methodologyNote:"Derived from PeeringDB topology cross-referenced with TeleGeography cable routes. Tatari analyst judgment on corridor dependence.",
    visualLogic:"pdb"},
  {id:"pdb_composite",label:"Tatari Composite",short:"TCI",sourceFamilies:["PeeringDB","Tatari"],domain:"Interconnection",tiedScores:["csi","ccr","ovr"],
    legendTitle:"Tatari Connectivity Composite",color:"rgba(220,180,255,0.8)",
    description:"Tatari's proprietary composite of interconnection depth, chokepoint resilience, and infrastructure maturity. Combines PeeringDB structural data with Tatari's analyst scoring. The definitive connectivity intelligence metric.",
    methodologyNote:"Tatari composite index. PeeringDB provides the structural evidence layer. Tatari scoring adds power, regulation, and geopolitical risk context. Updated monthly.",
    visualLogic:"pdb"},
];

const GLOBE_MODE_MAP={};GLOBE_MODES.forEach(m=>{GLOBE_MODE_MAP[m.id]=m;});

// ─── WEEKLY TRACKER SIGNALS ───
const WEEKLY_SIGNALS=[
  {id:"ws1",week:"Mar 2026",tracker:"TeleGeography",domain:"Cable",geography:["Red Sea","Gulf"],
    headline:"Triple cable failure near Jeddah — FALCON confirmed cut alongside SMW4 + IMEWE",
    sourceTitle:"TeleGeography Submarine Cable Map",sourceUrl:"https://www.submarinecablemap.com",sourceType:"tracker",
    confidence:"high",epistemic:"FACT",modeId:"cable_fragility",
    tatariInference:"Triple cable failure in single corridor is unprecedented. Red Sea chokepoint fragility undeniable.",
    signalImpact:"CCR ↓ for all Red Sea-dependent markets."},
  {id:"ws2",week:"Mar 2026",tracker:"TeleGeography",domain:"Cable",geography:["Egypt"],
    headline:"Egypt: 15 operational submarine cables, 3 under construction → 18 total. Cape bypass threatens transit monopoly.",
    sourceTitle:"TeleGeography",sourceUrl:"https://www.submarinecablemap.com",sourceType:"tracker",
    confidence:"high",epistemic:"FACT",modeId:"cable_fragility",
    tatariInference:"Egypt converting cable hub status into DC investment — but transit revenue threatened by alternative routing.",
    signalImpact:"CCR mixed for EG. Structural revenue risk from bypass cables."},
  {id:"ws3",week:"Feb 2026",tracker:"Digital Policy Alert",domain:"Regulation",geography:["Nigeria","Kenya","Indonesia","Turkey"],
    headline:"144 data localization measures across 62 countries — doubled since 2017. Enforcement entering active phase.",
    sourceTitle:"ITIF Data Localization Tracker",sourceUrl:"https://itif.org/publications/2024/02/12/how-much-will-gdpr-style-data-localization-spread/",sourceType:"secondary",
    confidence:"high",epistemic:"FACT",modeId:"localization_pressure",
    tatariInference:"Localization is structural, not cyclical. Infrastructure investment window before mandate enforcement closes.",
    signalImpact:"LPS ↑ NG, KE, ID, TR. Greenfield DC demand signal."},
  {id:"ws4",week:"Feb 2026",tracker:"Digital Policy Alert",domain:"Regulation",geography:["India"],
    headline:"DPDPA 2023 mandates data localization — RBI, SEBI, IRDAI sectoral requirements driving estimated 1,800 MW new demand.",
    sourceTitle:"Digital Policy Alert",sourceUrl:"https://digitalpolicyalert.org",sourceType:"tracker",
    confidence:"medium",epistemic:"EST",modeId:"localization_pressure",
    tatariInference:"India's layered sectoral localization is the most complex globally. Creates structural demand but compliance cost barrier.",
    signalImpact:"LPS ↑↑ IN. P2C demand pull validated."},
  {id:"ws5",week:"Jan 2026",tracker:"Interconnection.fyi",domain:"Power",geography:["United States"],
    headline:"U.S. interconnection queue backlog: 2,600+ GW pending. Average wait time 5+ years. Only 21% of projects reach commercial operation.",
    sourceTitle:"Interconnection.fyi",sourceUrl:"https://interconnection.fyi",sourceType:"tracker",
    confidence:"high",epistemic:"FACT",modeId:"grid_friction",
    tatariInference:"U.S. grid friction is structural and worsening. Queue pressure creates cost advantage for markets with available power.",
    signalImpact:"P2C ↓ US relative. P2C ↑ for power-surplus emerging markets."},
  {id:"ws6",week:"Jan 2026",tracker:"Interconnection.fyi",domain:"Power",geography:["United States"],
    headline:"Maharashtra (India) grid interconnection queue: 18-month backlog for 100 MVA connections.",
    sourceTitle:"Tatari internal",sourceUrl:"",sourceType:"primary",
    confidence:"medium",epistemic:"PARTIAL",modeId:"grid_friction",
    tatariInference:"India replicating U.S. queue pressure in concentrated hubs. Geographic diversification within India becomes critical.",
    signalImpact:"P2C constraint for Mumbai corridor. Chennai/Hyderabad may benefit."},
  {id:"ws7",week:"Mar 2026",tracker:"Steptoe",domain:"Regulation",geography:["United States"],
    headline:"Virginia: Loudoun County approves DC moratorium extension. Georgia, Indiana explore utility rate design for large loads.",
    sourceTitle:"Steptoe DC Regulation Tracker",sourceUrl:"https://www.steptoe.com/en/practices/data-center-regulation.html",sourceType:"tracker",
    confidence:"high",epistemic:"FACT",modeId:"large_load_politics",
    tatariInference:"U.S. large-load politics fragmenting state by state. Supportive states (TX, GA) gaining relative advantage.",
    signalImpact:"OVR ↓ for contested U.S. markets. Sovereign compute in non-U.S. markets validated."},
  {id:"ws8",week:"Feb 2026",tracker:"Steptoe",domain:"Regulation",geography:["United States"],
    headline:"South Carolina: legislature passes DC tax incentive package. Ohio: utility commission approves expedited interconnection for DCs.",
    sourceTitle:"Steptoe DC Regulation Tracker",sourceUrl:"https://www.steptoe.com/en/practices/data-center-regulation.html",sourceType:"tracker",
    confidence:"high",epistemic:"FACT",modeId:"large_load_politics",
    tatariInference:"Political support for DCs concentrating in Sunbelt and Midwest. Coastal states increasingly contested.",
    signalImpact:"U.S. DC geography reshuffling. Second-tier markets gaining."},
  {id:"ws9",week:"Mar 2026",tracker:"IEA",domain:"Power",geography:["Ethiopia","DRC"],
    headline:"IEA Africa Energy Outlook: 350 GW unexploited hydropower. Ethiopia 45 GW, DRC Inga 40 GW — $0.02–0.04/kWh.",
    sourceTitle:"IEA Africa Energy Outlook 2026",sourceUrl:"https://www.iea.org/reports/africa-energy-outlook-2022",sourceType:"secondary",
    confidence:"high",epistemic:"FACT",modeId:"structural_power",
    tatariInference:"Co-location at hydro source bypasses transmission constraint. 50–70% structural power cost advantage vs US/EU.",
    signalImpact:"P2C ↑↑ ET, CD. Stranded hydro thesis validated by IEA."},
  {id:"ws10",week:"Jan 2026",tracker:"IEA",domain:"Power",geography:["South Africa"],
    headline:"SA load-shedding ended mid-2024. 58 GW installed. Teraco 120 MW solar PV under construction. SOLA 195 MW operational.",
    sourceTitle:"Eskom / AEC 2026",sourceUrl:"https://energychamber.org/data-centers-could-be-the-spark-africas-power-sector-needs/",sourceType:"secondary",
    confidence:"high",epistemic:"FACT",modeId:"structural_power",
    tatariInference:"South Africa's power crisis stabilizing. DC-solar co-investment model spreading. Structural power improving.",
    signalImpact:"P2C ↑ ZA. Eskom fragility only remaining material risk."},
  {id:"ws11",week:"Dec 2025",tracker:"TeleGeography",domain:"Cable",geography:["Djibouti"],
    headline:"PEACE cable first African landing at Djibouti — adjacent to Chinese PLA naval base. HMN Tech repair in 3 weeks vs months for others.",
    sourceTitle:"Submarine Networks",sourceUrl:"https://www.submarinenetworks.com",sourceType:"secondary",
    confidence:"high",epistemic:"FACT",modeId:"cable_fragility",
    tatariInference:"Chinese repair advantage creates geopolitical leverage. Repair capacity = strategic asset.",
    signalImpact:"CCR implications for PEACE-dependent routes. Djibouti risk elevated."},
  {id:"ws12",week:"Nov 2025",tracker:"Digital Policy Alert",domain:"Regulation",geography:["Rwanda"],
    headline:"Rwanda Law 058/2021: explicit in-country storage mandate — among Africa's strongest. NCSA building enforcement capacity.",
    sourceTitle:"Digital Policy Alert",sourceUrl:"https://digitalpolicyalert.org",sourceType:"tracker",
    confidence:"high",epistemic:"FACT",modeId:"localization_pressure",
    tatariInference:"Rwanda's governance model creates compliance-grade demand signal despite small market. DFI confidence anchor.",
    signalImpact:"LPS ↑ RW. Raxio demand validated by mandate."},
];

// ─── COUNTRY MODE SCORES ───
// Maps country codes to mode-specific intensity (0-1) for globe rendering
function getCountryModeScore(countryCode, modeId) {
  const co = C[countryCode];
  if (!co || !co.sc) return null;
  switch(modeId) {
    case "classification": return null; // use default bucket logic
    case "cable_fragility": return co.sc.ccr != null ? (100 - co.sc.ccr) / 100 : null; // lower CCR = more fragile = brighter
    case "localization_pressure": return co.sc.lps != null ? co.sc.lps / 100 : null;
    case "grid_friction": return co.sc.p2c != null ? (100 - co.sc.p2c) / 100 : null; // lower P2C = more friction = brighter
    case "large_load_politics": return co.sc.ovr != null ? co.sc.ovr / 100 : null;
    case "structural_power": return co.sc.p2c != null ? co.sc.p2c / 100 : null;
    default: return null;
  }
}

// Get GC-level approximate score for untracked countries based on bucket
function getGCModeOpacity(bk, modeId) {
  const b = BUCKETS[bk];
  if (!b) return 0;
  if (modeId === "classification") return b.op;
  if (bk >= 8) return 0.06; // dim but visible
  const base = b.op;
  switch(modeId) {
    case "cable_fragility": return bk <= 3 ? base * 0.6 : base * 1.2;
    case "localization_pressure": return bk <= 2 ? base * 0.5 : base * 1.1;
    case "grid_friction": return bk >= 5 ? base * 1.3 : base * 0.7;
    case "structural_power": return bk <= 2 ? base * 1.2 : base * 0.8;
    case "large_load_politics": return bk <= 2 ? base * 1.1 : base * 0.6;
    default: return base;
  }
}

function getModeColor(modeId) {
  const m = GLOBE_MODE_MAP[modeId];
  return m ? m.color : "rgba(255,255,255,0.5)";
}

// Dim an rgba color string to a given opacity
function dimColor(rgba, opacity) {
  const parts = rgba.match(/([\d.]+)/g);
  if (!parts || parts.length < 4) return rgba;
  return "rgba(" + parts[0] + "," + parts[1] + "," + parts[2] + "," + opacity + ")";
}

// ─── APPROXIMATE SCORES FOR UNTRACKED NON-IRRELEVANT COUNTRIES ───
// [csi, p2c, lps, ccr, ovr] — analyst estimates from bucket position + known characteristics
const GC_SCORES={
  // ═ Bucket 1: Core Hyperscale ═
  "United States":[92,55,30,80,64],"Canada":[70,65,25,70,58],"United Kingdom":[75,50,40,65,58],
  "Germany":[72,48,45,60,56],"Netherlands":[68,52,35,62,54],"France":[65,55,38,58,54],
  "Ireland":[62,58,28,55,51],"Sweden":[55,72,22,50,50],"Japan":[78,42,55,70,61],
  "Singapore":[80,35,40,75,58],"Australia":[60,55,30,50,49],"South Korea":[72,40,50,65,57],
  "Hong Kong":[65,30,35,60,48],
  // ═ Bucket 2: Strategic Sovereign ═
  "China":[85,60,82,55,70],
  // ═ Bucket 3: Gateway ═
  "Portugal":[25,45,30,40,35],"Greece":[20,38,28,35,30],"Mauritius":[12,30,18,28,22],
  // ═ Bucket 4: Scaled Emerging ═
  "Mexico":[28,32,30,40,33],"Colombia":[18,35,25,32,28],"Switzerland":[55,60,20,55,48],
  "Spain":[42,48,35,45,43],"Italy":[40,42,38,42,41],"Poland":[35,45,32,40,38],
  "Finland":[38,68,22,42,42],"Israel":[45,40,45,38,42],"Taiwan":[60,38,40,55,48],
  "Philippines":[22,28,35,30,29],
  // ═ Bucket 5: Frontier ═
  "Kazakhstan":[12,55,20,22,27],"Cameroon":[6,20,12,15,13],
  // ═ Bucket 6: Edge / Tactical ═
  "Costa Rica":[8,42,10,25,21],"Jamaica":[5,22,8,18,13],"Dominican Republic":[8,25,10,20,16],
  "Trinidad and Tobago":[6,28,8,18,15],"Argentina":[18,30,22,28,25],"Peru":[10,25,15,22,18],
  "Uruguay":[12,38,12,20,20],"Ecuador":[8,28,12,18,17],"Denmark":[35,55,30,45,41],
  "Belgium":[32,45,35,42,39],"Austria":[30,52,28,38,37],"Czech Republic":[25,48,25,35,33],
  "Romania":[18,38,22,28,27],"Lithuania":[15,42,20,25,26],"Estonia":[18,50,18,28,29],
  "Luxembourg":[22,48,15,32,29],"Cyprus":[10,30,15,22,19],"Oman":[12,35,12,25,21],
  "Kuwait":[15,40,10,20,21],"Jordan":[8,25,15,18,17],"Georgia":[8,35,10,15,17],
  "Armenia":[6,32,10,12,15],"Azerbaijan":[8,38,12,15,18],"Senegal":[8,18,12,15,13],
  "Uganda":[6,15,10,12,11],"Tunisia":[12,28,18,22,20],"Benin":[5,12,8,10,9],
  "Zambia":[6,22,10,12,13],"Botswana":[5,20,8,10,11],"Namibia":[4,18,6,10,10],
  "Gabon":[5,15,8,12,10],"New Zealand":[28,55,18,35,34],"Sri Lanka":[8,22,12,18,15],
  // ═ Bucket 7: Constrained ═
  "Cuba":[3,8,5,8,6],"Venezuela":[5,12,8,10,9],"Belarus":[8,25,15,12,15],
  "Ukraine":[12,28,18,15,18],"Iraq":[5,18,8,10,10],"Iran":[10,30,20,8,17],
  "Lebanon":[4,10,8,8,8],"Uzbekistan":[6,22,10,10,12],"Algeria":[6,25,12,12,14],
  "Zimbabwe":[4,12,6,8,8],"Bangladesh":[10,15,18,18,15],
};

// ─── UTILITIES ───
function ll2v(lat,lng,r){const p=(90-lat)*(Math.PI/180),t=(lng+180)*(Math.PI/180);return new THREE.Vector3(-(r*Math.sin(p)*Math.cos(t)),r*Math.cos(p),r*Math.sin(p)*Math.sin(t));}
const OL={africa:[[37,10],[35,0],[37,-10],[31,-10],[25,-17],[15,-17],[5,-10],[4,-1],[4,10],[-5,12],[-15,12],[-20,15],[-28,17],[-34,18],[-34,22],[-33,27],[-25,33],[-15,40],[-5,40],[5,40],[12,44],[20,40],[30,33],[35,28],[37,10]],europe:[[36,-10],[43,-9],[44,0],[48,-5],[55,-3],[58,-5],[65,14],[70,20],[70,28],[60,30],[55,20],[53,10],[46,3],[44,8],[40,0],[36,-10]],asia:[[42,28],[45,40],[42,44],[45,60],[55,60],[65,70],[72,80],[70,90],[65,105],[55,110],[45,130],[35,136],[28,120],[20,110],[10,106],[5,103],[1,104],[-8,107],[-5,120],[5,127],[18,120],[28,122],[35,132],[38,140],[45,143],[52,140],[60,140],[68,180],[72,140],[65,100],[55,72],[45,40],[42,28]],na:[[70,-165],[71,-140],[60,-140],[55,-130],[48,-125],[35,-120],[25,-110],[18,-95],[18,-88],[25,-80],[30,-90],[38,-76],[42,-70],[48,-65],[55,-60],[65,-65],[75,-60],[83,-70],[83,-95],[72,-130],[70,-165]],sa:[[12,-72],[8,-77],[2,-80],[-10,-77],[-20,-70],[-30,-72],[-45,-75],[-55,-68],[-55,-65],[-48,-65],[-38,-58],[-30,-50],[-22,-40],[-10,-37],[-5,-35],[2,-52],[8,-62],[12,-72]],me:[[30,32],[35,36],[39,44],[40,48],[36,50],[30,50],[25,55],[22,55],[16,50],[12,44],[18,40],[24,34],[30,32]]};

// ─── PEERINGDB METRO CLUSTERS ───
// Source: PeeringDB (peeringdb.com) — used under explicit permission. Tatari does not own PeeringDB data.
// [city, lat, lng, exchanges, facilities, networks, tier] tier: 1=mega 2=major 3=regional 4=emerging
const PDB_METROS=[
// ═ NORTH AMERICA ═
["Ashburn",39.04,-77.49,8,65,2800,1],["New York",40.71,-74.01,5,30,1200,1],["Chicago",41.88,-87.63,4,20,950,1],
["Dallas",32.78,-96.80,3,15,780,2],["Los Angeles",34.05,-118.24,4,22,820,1],["Miami",25.76,-80.19,3,12,550,2],
["Seattle",47.61,-122.33,3,14,620,2],["San Jose",37.34,-121.89,3,18,680,1],["Denver",39.74,-104.99,2,8,320,2],
["Atlanta",33.75,-84.39,2,10,380,2],["Phoenix",33.45,-112.07,2,6,220,2],["Minneapolis",44.98,-93.27,2,5,180,3],
["Kansas City",39.10,-94.58,1,4,140,3],["St Louis",38.63,-90.20,1,3,90,3],["Portland",45.52,-122.68,2,5,160,3],
["Houston",29.76,-95.37,2,6,200,2],["Boston",42.36,-71.06,2,8,280,2],["Reston",38.97,-77.34,2,6,240,2],
["Columbus",39.96,-82.99,1,4,120,3],["Nashville",36.16,-86.78,1,3,80,3],["Salt Lake City",40.76,-111.89,1,3,90,3],
["Indianapolis",39.77,-86.16,1,3,80,3],["Charlotte",35.23,-80.84,1,3,70,3],["Tampa",27.95,-82.46,1,3,75,3],
["Toronto",43.65,-79.38,3,12,480,2],["Montreal",45.50,-73.57,2,6,220,2],["Vancouver",49.28,-123.12,2,5,180,2],
["Calgary",51.05,-114.07,1,3,80,3],["Winnipeg",49.90,-97.14,1,2,40,4],
["Mexico City",19.43,-99.13,3,8,280,2],["Guadalajara",20.67,-103.35,1,3,60,3],["Monterrey",25.67,-100.31,1,2,45,3],
["Queretaro",20.59,-100.39,1,3,50,3],["San Juan",18.47,-66.11,1,2,40,4],
["Panama City",8.98,-79.52,2,3,90,3],["San Jose CR",9.93,-84.08,1,2,35,4],["Guatemala City",14.63,-90.51,1,1,20,4],
["Tegucigalpa",14.07,-87.19,1,1,12,4],["Managua",12.11,-86.24,1,1,10,4],["Santo Domingo",18.47,-69.94,1,2,25,4],
["Kingston",18.00,-76.80,1,1,18,4],
// ═ SOUTH AMERICA ═
["Sao Paulo",-23.55,-46.63,5,22,900,1],["Rio de Janeiro",-22.91,-43.17,2,8,280,2],
["Curitiba",-25.43,-49.27,1,3,80,3],["Porto Alegre",-30.03,-51.23,1,2,50,3],
["Fortaleza",-3.72,-38.52,1,3,80,3],["Brasilia",-15.79,-47.88,1,2,40,3],
["Belo Horizonte",-19.92,-43.94,1,2,45,3],["Salvador",-12.97,-38.51,1,2,35,4],
["Buenos Aires",-34.60,-58.38,2,5,130,3],["Cordoba",-31.42,-64.18,1,1,25,4],
["Santiago",-33.45,-70.67,2,4,120,3],["Valparaiso",-33.05,-71.62,1,1,20,4],
["Bogota",4.71,-74.07,2,4,95,3],["Medellin",6.25,-75.56,1,2,40,4],["Barranquilla",10.96,-74.78,1,1,20,4],
["Lima",-12.05,-77.04,1,3,60,3],["Quito",-0.18,-78.47,1,2,30,4],["Guayaquil",-2.17,-79.92,1,1,20,4],
["Montevideo",-34.91,-56.19,1,2,35,4],["Asuncion",-25.26,-57.58,1,1,15,4],
["Caracas",10.49,-66.90,1,1,18,4],["La Paz",-16.50,-68.15,1,1,10,4],
// ═ EUROPE ═
["Frankfurt",50.11,8.68,12,48,2200,1],["Amsterdam",52.37,4.90,7,38,1900,1],["London",51.51,-0.13,6,52,1800,1],
["Paris",48.86,2.35,4,25,1050,1],["Marseille",43.30,5.37,3,8,320,2],["Lyon",45.76,4.84,1,3,80,3],
["Berlin",52.52,13.41,3,8,350,2],["Munich",48.14,11.58,2,6,220,2],["Hamburg",53.55,9.99,2,5,160,2],
["Dusseldorf",51.23,6.78,2,4,120,3],["Stuttgart",48.78,9.18,1,3,80,3],
["Zurich",47.38,8.54,2,6,200,2],["Geneva",46.20,6.14,1,3,80,3],
["Madrid",40.42,-3.70,3,10,340,2],["Barcelona",41.39,2.17,2,5,140,3],
["Milan",45.46,9.19,3,12,350,2],["Rome",41.90,12.50,2,5,140,3],["Turin",45.07,7.69,1,2,50,3],
["Stockholm",59.33,18.07,3,10,380,2],["Gothenburg",57.71,11.97,1,2,50,3],
["Helsinki",60.17,24.94,2,5,150,2],["Tallinn",59.44,24.75,1,3,60,3],
["Oslo",59.91,10.75,2,4,120,2],["Stavanger",58.97,5.73,1,2,30,4],
["Copenhagen",55.68,12.57,2,5,160,2],["Aarhus",56.15,10.21,1,1,25,4],
["Warsaw",52.23,21.01,3,8,280,2],["Krakow",50.06,19.94,1,2,40,3],["Wroclaw",51.11,17.04,1,1,25,4],
["Prague",50.08,14.44,2,5,160,2],["Brno",49.20,16.61,1,1,30,4],
["Vienna",48.21,16.37,2,5,180,2],["Bratislava",48.15,17.11,1,2,40,3],
["Budapest",47.50,19.04,2,4,120,3],["Bucharest",44.43,26.10,2,4,110,3],["Cluj",46.77,23.60,1,1,25,4],
["Sofia",42.70,23.32,1,3,70,3],["Zagreb",45.81,15.98,1,2,40,3],["Ljubljana",46.05,14.51,1,2,35,4],
["Belgrade",44.79,20.47,1,3,60,3],["Skopje",41.99,21.43,1,1,15,4],["Tirana",41.33,19.82,1,1,12,4],
["Lisbon",38.72,-9.14,2,4,110,3],["Porto",41.15,-8.61,1,2,40,4],
["Athens",37.98,23.73,1,3,70,3],["Thessaloniki",40.64,22.94,1,1,20,4],
["Dublin",53.35,-6.26,2,8,280,2],["Cork",51.90,-8.47,1,2,40,4],
["Brussels",50.85,4.35,2,6,200,2],["Antwerp",51.22,4.40,1,2,40,3],
["Luxembourg City",49.61,6.13,2,4,120,2],["Reykjavik",64.15,-21.94,1,2,30,3],
["Riga",56.95,24.11,1,2,40,3],["Vilnius",54.69,25.28,1,2,45,3],["Kaunas",54.90,23.89,1,1,20,4],
["Chisinau",47.01,28.86,1,1,18,4],["Minsk",53.90,27.57,1,2,30,4],
["Kiev",50.45,30.52,1,4,90,3],["Kharkiv",49.99,36.23,1,1,20,4],["Odessa",46.48,30.72,1,1,18,4],
["Moscow",55.76,37.62,3,12,420,2],["St Petersburg",59.93,30.32,2,5,140,2],
["Novosibirsk",55.04,82.93,1,2,40,3],["Yekaterinburg",56.84,60.60,1,2,35,3],
["Tbilisi",41.72,44.79,1,2,15,4],["Yerevan",40.18,44.51,1,1,12,4],["Baku",40.41,49.87,1,1,15,4],
// ═ MIDDLE EAST ═
["Dubai",25.20,55.27,2,8,280,2],["Abu Dhabi",24.45,54.65,1,4,120,3],["Fujairah",25.12,56.34,1,2,40,4],
["Riyadh",24.69,46.72,1,4,80,3],["Jeddah",21.54,39.17,1,2,40,4],["Dammam",26.43,50.10,1,2,30,4],
["Doha",25.29,51.53,1,2,45,4],["Manama",26.23,50.59,1,2,35,4],["Muscat",23.61,58.54,1,1,20,4],
["Kuwait City",29.38,47.99,1,2,30,4],["Amman",31.95,35.93,1,2,25,4],["Beirut",33.89,35.50,1,1,18,4],
["Istanbul",41.01,28.98,2,6,180,3],["Ankara",39.93,32.85,1,3,60,3],["Izmir",38.42,27.14,1,2,30,4],
["Tel Aviv",32.09,34.78,2,5,140,3],["Haifa",32.79,34.99,1,1,25,4],
["Baghdad",33.31,44.37,1,1,12,4],["Erbil",36.19,44.01,1,1,8,4],
["Tehran",35.69,51.39,1,3,40,4],["Isfahan",32.65,51.68,1,1,12,4],
// ═ AFRICA ═
["Johannesburg",-26.20,28.05,3,8,240,3],["Cape Town",-33.93,18.42,2,4,90,3],["Durban",-29.86,31.02,1,2,40,4],
["Nairobi",-1.29,36.82,2,5,120,3],["Mombasa",-4.04,39.67,1,1,15,4],
["Lagos",6.52,3.38,1,4,85,3],["Abuja",9.06,7.49,1,2,25,4],["Port Harcourt",4.78,7.01,1,1,12,4],
["Cairo",30.04,31.24,2,4,110,3],["Alexandria",31.20,29.92,1,1,20,4],
["Casablanca",33.59,-7.59,2,3,45,3],["Rabat",34.02,-6.84,1,1,15,4],
["Tunis",36.81,10.18,1,2,25,4],["Algiers",36.75,3.04,1,1,15,4],
["Addis Ababa",9.02,38.75,1,2,15,4],["Dire Dawa",9.60,41.85,1,1,4,4],
["Kigali",-1.94,29.87,1,1,10,4],["Djibouti City",11.59,43.15,1,1,8,4],
["Dar es Salaam",-6.79,39.28,1,1,12,4],["Accra",5.56,-0.20,1,2,18,4],["Kumasi",6.69,-1.62,1,1,5,4],
["Dakar",14.72,-17.47,1,1,12,4],["Abidjan",5.36,-4.01,1,2,15,4],
["Maputo",-25.97,32.58,1,1,8,4],["Luanda",-8.84,13.23,1,1,10,4],
["Kinshasa",-4.32,15.31,1,1,6,4],["Lubumbashi",-11.66,27.48,1,1,3,4],
["Kampala",0.35,32.58,1,1,10,4],["Lusaka",-15.39,28.32,1,1,8,4],
["Gaborone",-24.65,25.91,1,1,5,4],["Windhoek",-22.56,17.08,1,1,5,4],
["Libreville",0.39,9.45,1,1,4,4],["Douala",4.05,9.70,1,1,8,4],["Yaounde",3.87,11.52,1,1,6,4],
["Harare",-17.83,31.05,1,1,8,4],["Antananarivo",-18.91,47.54,1,1,5,4],
["Port Louis",-20.16,57.50,1,2,15,3],["Victoria Sey",-4.62,55.45,1,1,4,4],
["Cotonou",6.37,2.39,1,1,6,4],["Lome",6.14,1.21,1,1,5,4],
["Bamako",12.64,-8.00,1,1,4,4],["Ouagadougou",12.37,-1.52,1,1,4,4],["Niamey",13.51,2.11,1,1,3,4],
["Conakry",9.64,-13.58,1,1,3,4],["Freetown",8.47,-13.23,1,1,3,4],["Monrovia",6.30,-10.80,1,1,3,4],
["Mogadishu",2.05,45.34,1,1,3,4],["Juba",4.85,31.58,1,1,2,4],["Khartoum",15.60,32.53,1,1,5,4],
["Bujumbura",-3.38,29.36,1,1,3,4],["Praia",14.93,-23.51,1,1,3,4],["Nouakchott",18.09,-15.98,1,1,3,4],
// ═ SOUTH ASIA ═
["Mumbai",19.08,72.88,4,15,650,2],["Delhi",28.61,77.23,3,8,280,2],["Chennai",13.08,80.27,2,5,120,3],
["Bangalore",12.97,77.59,2,6,180,3],["Hyderabad",17.39,78.49,2,4,90,3],["Kolkata",22.57,88.36,1,2,40,4],
["Pune",18.52,73.86,1,3,60,3],["Ahmedabad",23.02,72.57,1,2,30,4],["Jaipur",26.91,75.79,1,1,15,4],
["Noida",28.57,77.32,1,4,120,3],["Kochi",9.93,76.27,1,1,20,4],
["Karachi",24.86,67.01,1,2,30,4],["Lahore",31.55,74.35,1,1,18,4],["Islamabad",33.69,73.04,1,2,20,4],
["Dhaka",23.81,90.41,1,2,25,4],["Chittagong",22.36,91.78,1,1,8,4],
["Colombo",6.93,79.84,1,1,15,4],["Kathmandu",27.70,85.32,1,1,8,4],
// ═ EAST ASIA ═
["Tokyo",35.68,139.69,6,28,1100,1],["Osaka",34.69,135.50,2,8,280,2],["Nagoya",35.18,136.91,1,2,40,3],
["Fukuoka",33.59,130.40,1,2,30,3],["Sapporo",43.06,141.35,1,1,15,4],
["Seoul",37.57,127.00,3,12,520,2],["Busan",35.18,129.08,1,3,60,3],["Daejeon",36.35,127.38,1,1,20,4],
["Hong Kong",22.32,114.17,3,18,850,1],["Taipei",25.03,121.57,3,8,260,2],["Kaohsiung",22.62,120.31,1,2,30,3],
["Beijing",39.90,116.40,3,10,380,2],["Shanghai",31.23,121.47,3,12,420,2],["Guangzhou",23.13,113.26,2,6,220,2],
["Shenzhen",22.54,114.06,2,5,180,2],["Hangzhou",30.27,120.15,1,3,60,3],["Nanjing",32.06,118.80,1,2,40,3],
["Chengdu",30.57,104.07,1,2,30,3],["Wuhan",30.59,114.31,1,2,25,3],["Xian",34.26,108.94,1,1,15,4],
["Ulaanbaatar",47.92,106.91,1,1,5,4],
// ═ SOUTHEAST ASIA ═
["Singapore",1.35,103.82,4,32,1400,1],["Jakarta",-6.21,106.85,3,10,280,2],
["Surabaya",-7.28,112.75,1,2,30,4],["Bandung",-6.91,107.61,1,1,15,4],
["Kuala Lumpur",3.14,101.69,3,8,220,2],["Johor Bahru",1.49,103.74,1,4,60,3],
["Cyberjaya",2.92,101.65,1,6,80,3],["Penang",5.41,100.33,1,2,20,4],
["Bangkok",13.76,100.50,2,6,180,2],["Chiang Mai",18.79,98.98,1,1,12,4],
["Ho Chi Minh City",10.82,106.63,2,4,80,3],["Hanoi",21.03,105.85,1,3,50,3],["Da Nang",16.07,108.22,1,1,12,4],
["Manila",14.60,120.98,2,4,90,3],["Cebu",10.32,123.89,1,1,15,4],
["Phnom Penh",11.56,104.92,1,1,10,4],["Vientiane",17.97,102.63,1,1,5,4],
["Yangon",16.87,96.20,1,1,8,4],["Bandar SB",4.93,114.95,1,1,4,4],
// ═ OCEANIA ═
["Sydney",-33.87,151.21,3,18,620,2],["Melbourne",-37.81,144.96,2,8,320,2],
["Brisbane",-27.47,153.03,1,4,120,3],["Perth",-31.95,115.86,1,3,80,3],
["Adelaide",-34.93,138.60,1,2,40,4],["Canberra",-35.28,149.13,1,2,30,4],
["Auckland",-36.85,174.76,2,3,90,3],["Wellington",-41.29,174.78,1,2,30,4],["Christchurch",-43.53,172.64,1,1,15,4],
["Suva",-18.14,178.44,1,1,5,4],["Port Moresby",-9.48,147.15,1,1,4,4],
// ═ CENTRAL ASIA ═
["Tashkent",41.30,69.28,1,1,12,4],["Almaty",43.24,76.95,1,2,18,4],["Nur-Sultan",51.17,71.45,1,1,8,4],
["Bishkek",42.87,74.59,1,1,8,4],["Dushanbe",38.54,68.77,1,1,5,4],["Kabul",34.53,69.17,1,1,5,4],
];

// PeeringDB country summaries — 120+ countries with PDB presence
const PDB_COUNTRY={
US:{ix:92,fac:420,net:4200,depth:"mega",choke:"low",composite:95},DE:{ix:28,fac:85,net:2500,depth:"mega",choke:"low",composite:88},
NL:{ix:12,fac:52,net:2100,depth:"mega",choke:"low",composite:86},GB:{ix:14,fac:68,net:2000,depth:"mega",choke:"low",composite:85},
FR:{ix:10,fac:42,net:1200,depth:"high",choke:"low",composite:78},JP:{ix:12,fac:38,net:1200,depth:"high",choke:"medium",composite:75},
SG:{ix:6,fac:35,net:1500,depth:"high",choke:"medium",composite:80},BR:{ix:8,fac:28,net:950,depth:"high",choke:"low",composite:68},
IN:{ix:10,fac:22,net:700,depth:"medium",choke:"medium",composite:55},AU:{ix:6,fac:24,net:680,depth:"medium",choke:"low",composite:58},
CA:{ix:6,fac:22,net:520,depth:"medium",choke:"low",composite:55},SE:{ix:5,fac:14,net:420,depth:"medium",choke:"low",composite:52},
IE:{ix:3,fac:10,net:300,depth:"medium",choke:"low",composite:48},KR:{ix:4,fac:16,net:540,depth:"medium",choke:"medium",composite:52},
HK:{ix:3,fac:20,net:880,depth:"high",choke:"medium",composite:72},CN:{ix:8,fac:30,net:450,depth:"medium",choke:"low",composite:52},
RU:{ix:5,fac:18,net:450,depth:"medium",choke:"low",composite:48},
ES:{ix:4,fac:12,net:360,depth:"medium",choke:"low",composite:48},IT:{ix:5,fac:15,net:380,depth:"medium",choke:"low",composite:50},
PL:{ix:4,fac:10,net:300,depth:"medium",choke:"low",composite:42},CH:{ix:3,fac:8,net:220,depth:"medium",choke:"low",composite:42},
DK:{ix:3,fac:6,net:180,depth:"medium",choke:"low",composite:42},BE:{ix:3,fac:8,net:220,depth:"medium",choke:"low",composite:45},
AT:{ix:2,fac:6,net:200,depth:"medium",choke:"low",composite:40},CZ:{ix:2,fac:6,net:170,depth:"medium",choke:"low",composite:38},
FI:{ix:2,fac:6,net:160,depth:"medium",choke:"low",composite:38},NO:{ix:3,fac:6,net:140,depth:"medium",choke:"low",composite:45},
TW:{ix:3,fac:10,net:280,depth:"medium",choke:"medium",composite:42},
ZA:{ix:4,fac:12,net:260,depth:"medium",choke:"low",composite:42},AE:{ix:2,fac:10,net:300,depth:"medium",choke:"high",composite:38},
SA:{ix:2,fac:8,net:120,depth:"low",choke:"high",composite:30},TR:{ix:3,fac:8,net:200,depth:"medium",choke:"medium",composite:40},
ID:{ix:4,fac:12,net:300,depth:"medium",choke:"medium",composite:42},MY:{ix:4,fac:10,net:240,depth:"medium",choke:"low",composite:45},
TH:{ix:3,fac:8,net:200,depth:"medium",choke:"low",composite:40},MX:{ix:4,fac:12,net:300,depth:"medium",choke:"low",composite:42},
IL:{ix:2,fac:6,net:150,depth:"low",choke:"medium",composite:32},
LU:{ix:2,fac:5,net:130,depth:"low",choke:"low",composite:30},PT:{ix:2,fac:5,net:120,depth:"low",choke:"low",composite:28},
RO:{ix:2,fac:5,net:120,depth:"low",choke:"low",composite:28},HU:{ix:2,fac:5,net:130,depth:"low",choke:"low",composite:28},
BG:{ix:1,fac:4,net:80,depth:"low",choke:"low",composite:18},RS:{ix:1,fac:3,net:65,depth:"low",choke:"low",composite:16},
EE:{ix:1,fac:3,net:65,depth:"low",choke:"low",composite:20},LT:{ix:1,fac:3,net:50,depth:"low",choke:"low",composite:16},
LV:{ix:1,fac:2,net:42,depth:"low",choke:"low",composite:14},SK:{ix:1,fac:3,net:45,depth:"low",choke:"low",composite:14},
HR:{ix:1,fac:3,net:45,depth:"low",choke:"low",composite:14},SI:{ix:1,fac:3,net:40,depth:"low",choke:"low",composite:13},
GR:{ix:1,fac:4,net:75,depth:"low",choke:"low",composite:22},UA:{ix:2,fac:5,net:100,depth:"low",choke:"medium",composite:22},
IS:{ix:1,fac:3,net:40,depth:"low",choke:"medium",composite:22},
KE:{ix:2,fac:6,net:130,depth:"low",choke:"medium",composite:28},NG:{ix:1,fac:5,net:95,depth:"low",choke:"medium",composite:22},
EG:{ix:2,fac:5,net:120,depth:"low",choke:"high",composite:25},VN:{ix:2,fac:5,net:90,depth:"low",choke:"medium",composite:25},
PH:{ix:2,fac:5,net:100,depth:"low",choke:"medium",composite:22},CO:{ix:2,fac:5,net:100,depth:"low",choke:"low",composite:25},
CL:{ix:2,fac:5,net:130,depth:"low",choke:"low",composite:28},AR:{ix:2,fac:6,net:140,depth:"low",choke:"low",composite:28},
NZ:{ix:2,fac:4,net:100,depth:"low",choke:"low",composite:28},PA:{ix:2,fac:4,net:100,depth:"low",choke:"low",composite:30},
QA:{ix:1,fac:3,net:50,depth:"low",choke:"high",composite:18},BH:{ix:1,fac:3,net:40,depth:"low",choke:"critical",composite:14},
PK:{ix:2,fac:4,net:35,depth:"low",choke:"critical",composite:12},IR:{ix:1,fac:3,net:45,depth:"low",choke:"high",composite:12},
MA:{ix:2,fac:4,net:50,depth:"low",choke:"low",composite:20},PE:{ix:1,fac:4,net:65,depth:"low",choke:"low",composite:16},
MU:{ix:1,fac:2,net:18,depth:"minimal",choke:"medium",composite:10},
ET:{ix:1,fac:3,net:18,depth:"minimal",choke:"high",composite:8},RW:{ix:1,fac:2,net:12,depth:"minimal",choke:"high",composite:6},
DJ:{ix:1,fac:1,net:10,depth:"minimal",choke:"critical",composite:4},CD:{ix:1,fac:2,net:8,depth:"minimal",choke:"critical",composite:3},
MZ:{ix:1,fac:2,net:10,depth:"minimal",choke:"high",composite:5},AO:{ix:1,fac:2,net:12,depth:"minimal",choke:"high",composite:5},
CM:{ix:1,fac:2,net:10,depth:"minimal",choke:"medium",composite:6},KZ:{ix:1,fac:3,net:20,depth:"minimal",choke:"medium",composite:10},
GH:{ix:1,fac:3,net:22,depth:"minimal",choke:"medium",composite:10},TZ:{ix:1,fac:2,net:14,depth:"minimal",choke:"medium",composite:7},
CI:{ix:1,fac:2,net:16,depth:"minimal",choke:"medium",composite:8},SN:{ix:1,fac:2,net:14,depth:"minimal",choke:"medium",composite:7},
UG:{ix:1,fac:2,net:12,depth:"minimal",choke:"medium",composite:6},TN:{ix:1,fac:2,net:28,depth:"minimal",choke:"low",composite:10},
DZ:{ix:1,fac:1,net:18,depth:"minimal",choke:"low",composite:6},BJ:{ix:1,fac:1,net:8,depth:"minimal",choke:"medium",composite:4},
ZM:{ix:1,fac:1,net:10,depth:"minimal",choke:"medium",composite:5},BW:{ix:1,fac:1,net:6,depth:"minimal",choke:"medium",composite:4},
NA:{ix:1,fac:1,net:6,depth:"minimal",choke:"medium",composite:4},GA:{ix:1,fac:1,net:5,depth:"minimal",choke:"medium",composite:3},
ZW:{ix:1,fac:1,net:10,depth:"minimal",choke:"medium",composite:4},LK:{ix:1,fac:1,net:18,depth:"minimal",choke:"medium",composite:7},
BD:{ix:1,fac:2,net:28,depth:"minimal",choke:"medium",composite:8},JO:{ix:1,fac:2,net:28,depth:"minimal",choke:"medium",composite:8},
KW:{ix:1,fac:2,net:32,depth:"minimal",choke:"high",composite:8},OM:{ix:1,fac:1,net:22,depth:"minimal",choke:"high",composite:6},
GE:{ix:1,fac:2,net:18,depth:"minimal",choke:"low",composite:6},AM:{ix:1,fac:1,net:14,depth:"minimal",choke:"low",composite:5},
AZ:{ix:1,fac:1,net:16,depth:"minimal",choke:"low",composite:5},CY:{ix:1,fac:2,net:25,depth:"minimal",choke:"medium",composite:8},
BY:{ix:1,fac:2,net:32,depth:"minimal",choke:"medium",composite:8},IQ:{ix:1,fac:2,net:15,depth:"minimal",choke:"high",composite:5},
LB:{ix:1,fac:1,net:20,depth:"minimal",choke:"high",composite:5},UZ:{ix:1,fac:1,net:14,depth:"minimal",choke:"medium",composite:5},
VE:{ix:1,fac:1,net:20,depth:"minimal",choke:"medium",composite:5},CU:{ix:1,fac:1,net:5,depth:"minimal",choke:"high",composite:2},
MD:{ix:1,fac:1,net:20,depth:"minimal",choke:"low",composite:6},MT:{ix:1,fac:1,net:12,depth:"minimal",choke:"low",composite:5},
AL:{ix:1,fac:1,net:14,depth:"minimal",choke:"low",composite:5},MK:{ix:1,fac:1,net:12,depth:"minimal",choke:"low",composite:4},
ME:{ix:1,fac:1,net:10,depth:"minimal",choke:"low",composite:4},BA:{ix:1,fac:1,net:15,depth:"minimal",choke:"low",composite:5},
XK:{ix:1,fac:1,net:8,depth:"minimal",choke:"low",composite:3},
EC:{ix:1,fac:2,net:32,depth:"minimal",choke:"low",composite:8},UY:{ix:1,fac:2,net:38,depth:"minimal",choke:"low",composite:10},
CR:{ix:1,fac:2,net:38,depth:"minimal",choke:"low",composite:10},DO:{ix:1,fac:2,net:28,depth:"minimal",choke:"medium",composite:8},
JM:{ix:1,fac:1,net:20,depth:"minimal",choke:"medium",composite:6},TT:{ix:1,fac:1,net:15,depth:"minimal",choke:"medium",composite:5},
GT:{ix:1,fac:1,net:22,depth:"minimal",choke:"low",composite:6},HN:{ix:1,fac:1,net:10,depth:"minimal",choke:"medium",composite:4},
NI:{ix:1,fac:1,net:8,depth:"minimal",choke:"medium",composite:3},SV:{ix:1,fac:1,net:8,depth:"minimal",choke:"low",composite:3},
PY:{ix:1,fac:1,net:10,depth:"minimal",choke:"low",composite:3},BO:{ix:1,fac:1,net:8,depth:"minimal",choke:"medium",composite:3},
SD:{ix:1,fac:1,net:6,depth:"minimal",choke:"high",composite:3},SO:{ix:1,fac:1,net:4,depth:"minimal",choke:"critical",composite:2},
MM:{ix:1,fac:1,net:8,depth:"minimal",choke:"medium",composite:3},KH:{ix:1,fac:1,net:6,depth:"minimal",choke:"low",composite:3},
LA:{ix:1,fac:1,net:4,depth:"minimal",choke:"low",composite:2},NP:{ix:1,fac:1,net:8,depth:"minimal",choke:"high",composite:3},
MN:{ix:1,fac:1,net:6,depth:"minimal",choke:"medium",composite:3},FJ:{ix:1,fac:1,net:5,depth:"minimal",choke:"medium",composite:2},
PG:{ix:1,fac:1,net:4,depth:"minimal",choke:"high",composite:2},MG:{ix:1,fac:1,net:6,depth:"minimal",choke:"medium",composite:3},
MW:{ix:1,fac:1,net:4,depth:"minimal",choke:"medium",composite:2},BI:{ix:1,fac:1,net:3,depth:"minimal",choke:"high",composite:2},
ML:{ix:1,fac:1,net:5,depth:"minimal",choke:"medium",composite:2},BF:{ix:1,fac:1,net:4,depth:"minimal",choke:"medium",composite:2},
GN:{ix:1,fac:1,net:4,depth:"minimal",choke:"medium",composite:2},TG:{ix:1,fac:1,net:5,depth:"minimal",choke:"medium",composite:2},
NE:{ix:1,fac:1,net:3,depth:"minimal",choke:"medium",composite:1},SL:{ix:1,fac:1,net:3,depth:"minimal",choke:"medium",composite:1},
LR:{ix:1,fac:1,net:3,depth:"minimal",choke:"medium",composite:1},TD:{ix:1,fac:1,net:2,depth:"minimal",choke:"high",composite:1},
SS:{ix:0,fac:0,net:1,depth:"none",choke:"critical",composite:0},CF:{ix:0,fac:0,net:1,depth:"none",choke:"critical",composite:0},
ER:{ix:0,fac:0,net:1,depth:"none",choke:"critical",composite:0},
};
function SBar({k,v}){const b=scoreBand(v);return (<div style={{marginBottom:8}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}><span style={{fontFamily:"'Inter',sans-serif",fontSize:9,color:"rgba(255,255,255,0.3)",textTransform:"uppercase"}}>{k}</span><span style={{fontFamily:"'SF Mono',monospace",fontSize:9,color:b.c}}>{b.label}</span></div><div style={{height:2,background:"rgba(255,255,255,0.06)",borderRadius:1}}><div style={{height:"100%",width:`${Math.min(100,v)}%`,background:b.c,borderRadius:1}} /></div></div>);}

function Src({sources}){const[o,setO]=useState(false);if(!sources)return (<div style={{padding:"0 24px 12px"}}><div style={{display:"flex",alignItems:"center",gap:5,padding:"6px 10px",background:"rgba(255,255,255,0.01)",border:"1px solid rgba(255,255,255,0.04)",borderRadius:5}}><div style={{width:4,height:4,borderRadius:"50%",background:"rgba(255,200,100,0.4)"}} /><span style={{fontFamily:"'SF Mono',monospace",fontSize:8,color:"rgba(255,255,255,0.2)"}}>Provenance backfill in progress</span></div></div>);
  return (<div style={{padding:"0 24px 12px"}}><button onClick={()=>setO(!o)} style={{width:"100%",display:"flex",justifyContent:"space-between",padding:"8px 12px",background:"rgba(255,255,255,0.015)",border:"1px solid rgba(255,255,255,0.04)",borderRadius:6,cursor:"pointer",color:"#fff"}}><span style={{fontFamily:"'SF Mono',monospace",fontSize:8,color:"rgba(255,255,255,0.25)"}}>SOURCES ({sources.length})</span><span style={{fontSize:10,color:"rgba(255,255,255,0.15)",transform:o?"rotate(180deg)":"",transition:"transform .3s"}}>▾</span></button>
    {o&&<div style={{marginTop:3,background:"rgba(255,255,255,0.01)",border:"1px solid rgba(255,255,255,0.03)",borderRadius:6,padding:"8px 10px"}}>{sources.map((s,i)=>(<div key={i} style={{marginBottom:i<sources.length-1?8:0,borderBottom:i<sources.length-1?"1px solid rgba(255,255,255,0.03)":"none",paddingBottom:i<sources.length-1?8:0}}><div style={{display:"flex",gap:3}}><span style={{fontFamily:"'SF Mono',monospace",fontSize:7,color:s.status==="verified"?"rgba(150,255,150,0.4)":"rgba(255,200,100,0.4)",background:"rgba(255,255,255,0.03)",padding:"1px 4px",borderRadius:2}}>{s.status}</span></div><div style={{fontFamily:"'Inter',sans-serif",fontSize:10,color:"rgba(255,255,255,0.45)",marginTop:2}}>{s.id&&<span style={{fontFamily:"'SF Mono',monospace",fontSize:7,color:"rgba(255,255,255,0.12)",marginRight:4}}>{s.id}</span>}{s.claim}</div><div style={{fontFamily:"'Inter',sans-serif",fontSize:9,color:"rgba(255,255,255,0.2)"}}>{s.source}</div></div>))}</div>}</div>);}

function Sec({title,data}){if(!data)return null;const items=typeof data==="string"?{summary:data}:data;return (<div style={{padding:"0 24px 12px"}}><div style={{fontFamily:"'SF Mono',monospace",fontSize:8,color:"rgba(255,255,255,0.2)",marginBottom:6}}>{title}</div><div style={{background:"rgba(255,255,255,0.015)",border:"1px solid rgba(255,255,255,0.04)",borderRadius:6,padding:"10px 12px"}}>{Object.entries(items).map(([k,v])=>(<div key={k} style={{marginBottom:4}}><span style={{fontFamily:"'Inter',sans-serif",fontSize:8,color:"rgba(255,255,255,0.2)",textTransform:"uppercase"}}>{k}: </span><span style={{fontFamily:"'Inter',sans-serif",fontSize:10,color:"rgba(255,255,255,0.45)",lineHeight:1.4}}>{clean(Array.isArray(v)?v.join(", "):v)}</span></div>))}</div></div>);}

function CPanel({id,onClose,onPj}){const c=C[id];if(!c)return null;const st=SD[pStatus(c)]||SD.unsourced;const pjs=(c.pj||[]).map(p=>P[p]).filter(Boolean);
  return (<div style={{position:"fixed",top:0,right:0,bottom:0,width:"min(540px,92vw)",zIndex:200,background:"rgba(6,6,10,0.97)",backdropFilter:"blur(40px)",borderLeft:"1px solid rgba(255,255,255,0.06)",overflowY:"auto",animation:"sI .35s cubic-bezier(.16,1,.3,1)"}}>
    <div style={{padding:"18px 24px",borderBottom:"1px solid rgba(255,255,255,0.04)",position:"sticky",top:0,background:"rgba(6,6,10,0.97)",zIndex:10}}><div style={{display:"flex",justifyContent:"space-between"}}><div><div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}><span style={{fontFamily:"'SF Mono',monospace",fontSize:8,color:"rgba(255,255,255,0.2)"}}>{id}</span><span style={{fontFamily:"'SF Mono',monospace",fontSize:7,color:`rgba(255,255,255,${BUCKETS[c.bk||8].op})`,background:"rgba(255,255,255,0.03)",padding:"1px 5px",borderRadius:3}}>{BUCKETS[c.bk||8].short}</span><span style={{fontFamily:"'SF Mono',monospace",fontSize:7,color:st.c,background:"rgba(255,255,255,0.03)",padding:"1px 5px",borderRadius:3}}>{st.l}</span></div><h2 style={{fontFamily:"'Instrument Serif',Georgia,serif",fontSize:22,fontWeight:400,color:"#fff",margin:0}}>{c.n}</h2><div style={{fontFamily:"'Inter',sans-serif",fontSize:10,color:"rgba(255,255,255,0.25)",marginTop:2}}>{c.r} · {c.pop}{c.up?` · ${c.up}`:""}</div></div><button onClick={onClose} style={{width:26,height:26,borderRadius:5,border:"1px solid rgba(255,255,255,0.08)",background:"none",color:"rgba(255,255,255,0.4)",cursor:"pointer",fontSize:13}}>×</button></div><p style={{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:300,color:"rgba(255,255,255,0.4)",lineHeight:1.5,margin:"8px 0 0"}}>{clean(c.hl)}</p></div>
    {c.sc&&<div style={{padding:"14px 24px"}}><div style={{fontFamily:"'SF Mono',monospace",fontSize:8,color:"rgba(255,255,255,0.2)",marginBottom:8}}>SCORING — ANALYST JUDGMENT</div>{Object.entries(SM).map(([k,l])=>c.sc[k]!=null?(<SBar key={k} k={l} v={c.sc[k]} />):null)}</div>}
    {c.d&&Object.entries(c.d).map(([k,v])=>(<Sec key={k} title={k.toUpperCase()} data={v} />))}
    {pjs.length>0&&<div style={{padding:"0 24px 10px"}}><div style={{fontFamily:"'SF Mono',monospace",fontSize:8,color:"rgba(255,255,255,0.2)",marginBottom:6}}>PROJECTS</div>{pjs.map((p,i)=>(<button key={i} onClick={()=>onPj(c.pj[i])} style={{width:"100%",textAlign:"left",padding:"10px",marginBottom:3,background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.04)",borderRadius:6,cursor:"pointer",color:"#fff"}}><div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:500}}>{p.n}</span><span style={{fontFamily:"'SF Mono',monospace",fontSize:8,color:p.st==="Operational"?"rgba(150,255,150,0.5)":"rgba(255,200,100,0.5)"}}>{p.st}</span></div></button>))}</div>}
    {c.wl&&<div style={{padding:"0 24px 8px"}}><div style={{fontFamily:"'SF Mono',monospace",fontSize:8,color:"rgba(255,255,255,0.2)",marginBottom:6}}>WATCHLIST</div>{c.wl.map((w,i)=>(<div key={i} style={{display:"flex",gap:6,marginBottom:4}}><div style={{width:3,height:3,borderRadius:"50%",background:"rgba(255,255,255,0.15)",marginTop:5,flexShrink:0}} /><span style={{fontFamily:"'Inter',sans-serif",fontSize:10,color:"rgba(255,255,255,0.3)"}}>{w}</span></div>))}</div>}
    <Src sources={c.sources} /></div>);}

function PPanel({id,onClose}){const p=P[id];if(!p)return null;return (<div style={{position:"fixed",top:0,right:0,bottom:0,width:"min(480px,90vw)",zIndex:210,background:"rgba(6,6,10,0.97)",backdropFilter:"blur(40px)",borderLeft:"1px solid rgba(255,255,255,0.06)",overflowY:"auto",animation:"sI .35s cubic-bezier(.16,1,.3,1)"}}>
  <div style={{padding:"18px 24px",borderBottom:"1px solid rgba(255,255,255,0.04)"}}><div style={{display:"flex",justifyContent:"space-between"}}><div><h2 style={{fontFamily:"'Instrument Serif',Georgia,serif",fontSize:18,fontWeight:400,color:"#fff",margin:0}}>{p.n}</h2><div style={{display:"flex",gap:4,marginTop:6}}><span style={{fontFamily:"'SF Mono',monospace",fontSize:8,color:p.st==="Operational"?"rgba(150,255,150,0.5)":"rgba(255,200,100,0.5)",background:"rgba(255,255,255,0.03)",padding:"2px 6px",borderRadius:3}}>{p.st}</span><span style={{fontFamily:"'SF Mono',monospace",fontSize:8,color:"rgba(255,255,255,0.25)",background:"rgba(255,255,255,0.02)",padding:"2px 6px",borderRadius:3}}>{p.t}</span></div></div><button onClick={onClose} style={{width:26,height:26,borderRadius:5,border:"1px solid rgba(255,255,255,0.08)",background:"none",color:"rgba(255,255,255,0.4)",cursor:"pointer",fontSize:13}}>×</button></div></div>
  <div style={{padding:"14px 24px"}}>{[["Capacity",p.cap],["Bankability",p.bk!=null?scoreBand(p.bk).label+` (${p.bk}/100)`:null],["Strategic",p.s]].map(([l,v])=>v?(<div key={l} style={{marginBottom:10}}><div style={{fontFamily:"'Inter',sans-serif",fontSize:8,color:"rgba(255,255,255,0.2)",textTransform:"uppercase",marginBottom:2}}>{l}</div><div style={{fontFamily:"'Inter',sans-serif",fontSize:11,color:"rgba(255,255,255,0.45)",lineHeight:1.5}}>{v}</div></div>):null)}</div>
  <Src sources={p.sources} /></div>);}

// Signals where Tatari's judgment proved directional — shown as "Called It" badges
const CALLED_IT_IDS = new Set([18, 23, 25, 26, 36, 50]);

const DM_COLORS = {
  Conflict:    "rgba(255,100,100,0.55)",
  Cable:       "rgba(100,180,255,0.55)",
  Semiconductor:"rgba(200,150,255,0.55)",
  Compute:     "rgba(100,220,180,0.55)",
  Finance:     "rgba(255,210,100,0.55)",
  Power:       "rgba(255,170,60,0.55)",
  Regulation:  "rgba(180,180,180,0.45)",
};

function WTStats({signals}){
  const total=signals.length;
  const critA=signals.filter(s=>s.cr==="A").length;
  const domains=[...new Set(signals.map(s=>s.dm))].length;
  const called=signals.filter(s=>CALLED_IT_IDS.has(s.id)).length;
  const stats=[
    {l:"Total signals",v:total},
    {l:"Critical [A]",v:critA},
    {l:"Domains",v:domains},
    {l:"Called it",v:called},
  ];
  return (
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:20}}>
      {stats.map(({l,v})=>(
        <div key={l} style={{padding:"10px 12px",background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.04)",borderRadius:6}}>
          <div style={{fontFamily:"'Instrument Serif',Georgia,serif",fontSize:22,fontWeight:400,color:"#fff",lineHeight:1}}>{v}</div>
          <div style={{fontFamily:"'SF Mono',monospace",fontSize:7,color:"rgba(255,255,255,0.2)",marginTop:4,letterSpacing:"0.08em"}}>{l.toUpperCase()}</div>
        </div>
      ))}
    </div>
  );
}

function WTFilters({activeDm,setActiveDm,activeCr,setActiveCr,signals}){
  const domains=["All",...[...new Set(signals.map(s=>s.dm))].sort()];
  return (
    <div style={{marginBottom:16,display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
      <div style={{display:"flex",gap:2,flexWrap:"wrap"}}>
        {domains.map(d=>{
          const col=DM_COLORS[d];
          const active=activeDm===d;
          return (
            <button key={d} onClick={()=>setActiveDm(d)}
              style={{fontFamily:"'SF Mono',monospace",fontSize:7,letterSpacing:"0.06em",cursor:"pointer",
                color:active?(d==="All"?"#fff":"#000"):col||"rgba(255,255,255,0.3)",
                background:active?(d==="All"?"rgba(255,255,255,0.12)":col||"rgba(255,255,255,0.08)"):"transparent",
                border:`1px solid ${active?(col||"rgba(255,255,255,0.2)"):(col?.replace("0.55","0.18")||"rgba(255,255,255,0.08)")}`,
                padding:"4px 9px",borderRadius:3,transition:"all 0.15s",fontWeight:active?600:400,
              }}>
              {d.toUpperCase()}
            </button>
          );
        })}
      </div>
      <div style={{width:1,height:16,background:"rgba(255,255,255,0.08)",flexShrink:0}} />
      {["All","A","B"].map(cr=>{
        const active=activeCr===cr;
        const crCol=cr==="A"?"rgba(150,255,150,0.7)":cr==="B"?"rgba(255,200,100,0.6)":null;
        return (
          <button key={cr} onClick={()=>setActiveCr(cr)}
            style={{fontFamily:"'SF Mono',monospace",fontSize:7,cursor:"pointer",
              color:active?(cr==="All"?"#fff":"#000"):crCol||"rgba(255,255,255,0.3)",
              background:active?(cr==="All"?"rgba(255,255,255,0.1)":crCol||"rgba(255,255,255,0.08)"):"transparent",
              border:`1px solid ${active?(crCol||"rgba(255,255,255,0.2)"):(crCol?.replace("0.7","0.18").replace("0.6","0.15")||"rgba(255,255,255,0.08)")}`,
              padding:"4px 9px",borderRadius:3,transition:"all 0.15s",fontWeight:active?600:400,
            }}>
            {cr==="All"?"ALL CR":cr==="A"?"[A] CRITICAL":"[B] VERIFIED"}
          </button>
        );
      })}
    </div>
  );
}

function WTSignal({s,isExp,onToggle}){
  const dmColor = DM_COLORS[s.dm] || "rgba(200,200,200,0.4)";
  const isCalled = CALLED_IT_IDS.has(s.id);
  return (
    <div style={{marginBottom:3,border:`1px solid ${isExp?"rgba(255,255,255,0.07)":"rgba(255,255,255,0.04)"}`,borderRadius:6,background:isExp?"rgba(255,255,255,0.02)":"transparent",transition:"border-color .2s"}}>
      <button onClick={onToggle}
        style={{width:"100%",padding:"11px 14px",display:"flex",alignItems:"flex-start",justifyContent:"space-between",background:"none",border:"none",cursor:"pointer",color:"#fff",textAlign:"left",gap:10}}>
        <div style={{flex:1,minWidth:0}}>
          <div style={{display:"flex",gap:4,marginBottom:4,flexWrap:"wrap",alignItems:"center"}}>
            {/* Domain badge */}
            <span style={{fontFamily:"'SF Mono',monospace",fontSize:7,color:dmColor,background:"rgba(255,255,255,0.03)",border:`1px solid ${dmColor.replace("0.55","0.15")}`,padding:"1px 5px",borderRadius:2,letterSpacing:"0.06em"}}>
              {s.dm.toUpperCase()}
            </span>
            {/* Geography */}
            <span style={{fontFamily:"'SF Mono',monospace",fontSize:7,color:"rgba(255,255,255,0.2)"}}>{s.g}</span>
            {/* Criticality */}
            <span style={{fontFamily:"'SF Mono',monospace",fontSize:7,
              color:s.cr==="A"?"rgba(150,255,150,0.6)":"rgba(255,200,100,0.4)",
              background:s.cr==="A"?"rgba(150,255,150,0.06)":"rgba(255,200,100,0.04)",
              border:`1px solid ${s.cr==="A"?"rgba(150,255,150,0.15)":"rgba(255,200,100,0.1)"}`,
              padding:"1px 5px",borderRadius:2}}>
              {s.cr==="A"?"CRITICAL":"VERIFIED"}
            </span>
            {/* Called It badge */}
            {isCalled&&<span style={{fontFamily:"'SF Mono',monospace",fontSize:7,
              color:"rgba(255,220,80,0.8)",background:"rgba(255,220,80,0.06)",
              border:"1px solid rgba(255,220,80,0.2)",padding:"1px 5px",borderRadius:2,letterSpacing:"0.06em"}}>
              ✓ TATARI CALLED IT
            </span>}
          </div>
          <div style={{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:500,lineHeight:1.3,color:"rgba(255,255,255,0.85)"}}>{s.t}</div>
          <div style={{fontFamily:"'Inter',sans-serif",fontSize:9,color:"rgba(255,255,255,0.18)",marginTop:3}}>{s.d}</div>
        </div>
        <span style={{fontFamily:"monospace",fontSize:10,color:"rgba(255,255,255,0.15)",transform:isExp?"rotate(180deg)":"",transition:"transform .3s",flexShrink:0,marginTop:2}}>▾</span>
      </button>

      {isExp&&(
        <div style={{padding:"0 14px 14px"}}>
          {/* Facts */}
          <div style={{marginBottom:10}}>
            {s.f.map((f,j)=>(
              <div key={j} style={{fontFamily:"'Inter',sans-serif",fontSize:10,color:"rgba(255,255,255,0.35)",
                paddingLeft:8,borderLeft:"2px solid rgba(255,255,255,0.05)",marginBottom:3,lineHeight:1.4}}>
                {f}
              </div>
            ))}
          </div>
          {/* Source link */}
          {s.url&&<div style={{marginTop:6}}>
            <a href={s.url} target="_blank" rel="noopener noreferrer"
              style={{fontFamily:"'SF Mono',monospace",fontSize:8,color:"rgba(100,180,255,0.6)",
                textDecoration:"none",display:"inline-flex",alignItems:"center",gap:4,
                padding:"3px 8px",background:"rgba(100,180,255,0.06)",
                border:"1px solid rgba(100,180,255,0.15)",borderRadius:3}}>
              ↗ SOURCE
            </a>
          </div>}
          {/* Two-column inference + impact */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:4}}>
            <div style={{padding:"8px 10px",background:"rgba(255,255,255,0.015)",border:"1px solid rgba(255,255,255,0.04)",borderRadius:5}}>
              <div style={{fontFamily:"'SF Mono',monospace",fontSize:7,color:"rgba(255,255,255,0.2)",marginBottom:4,letterSpacing:"0.08em"}}>TATARI INFERENCE</div>
              <div style={{fontFamily:"'Inter',sans-serif",fontSize:10,color:"rgba(255,255,255,0.4)",lineHeight:1.5,fontStyle:"italic"}}>{s.inf}</div>
            </div>
            <div style={{padding:"8px 10px",background:"rgba(255,255,255,0.015)",border:"1px solid rgba(255,255,255,0.04)",borderRadius:5}}>
              <div style={{fontFamily:"'SF Mono',monospace",fontSize:7,color:"rgba(255,255,255,0.2)",marginBottom:4,letterSpacing:"0.08em"}}>SIGNAL IMPACT</div>
              <div style={{fontFamily:"'SF Mono',monospace",fontSize:9,color:"rgba(255,255,255,0.5)",lineHeight:1.5}}>{s.imp}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function WT({signals}){
  const[exp,setExp]=useState(null);
  const[activeDm,setActiveDm]=useState("All");
  const[activeCr,setActiveCr]=useState("All");

  const filtered=signals.filter(s=>{
    if(activeDm!=="All"&&s.dm!==activeDm)return false;
    if(activeCr!=="All"&&s.cr!==activeCr)return false;
    return true;
  });

  return (
    <div>
      <WTStats signals={signals} />
      <WTFilters activeDm={activeDm} setActiveDm={setActiveDm} activeCr={activeCr} setActiveCr={setActiveCr} signals={signals} />
      <div style={{fontFamily:"'Inter',sans-serif",fontSize:9,color:"rgba(255,255,255,0.15)",marginBottom:10}}>
        {filtered.length} of {signals.length} signals
        {(activeDm!=="All"||activeCr!=="All")&&
          <button onClick={()=>{setActiveDm("All");setActiveCr("All");}}
            style={{marginLeft:8,fontFamily:"'SF Mono',monospace",fontSize:7,color:"rgba(255,255,255,0.25)",background:"transparent",border:"none",cursor:"pointer",textDecoration:"underline"}}>
            clear filters
          </button>
        }
      </div>
      {filtered.map((s,i)=>(
        <WTSignal key={s.id} s={s} isExp={exp===s.id} onToggle={()=>setExp(exp===s.id?null:s.id)} />
      ))}
      {filtered.length===0&&(
        <div style={{fontFamily:"'Inter',sans-serif",fontSize:11,color:"rgba(255,255,255,0.2)",padding:"40px 0",textAlign:"center"}}>
          No signals match current filters.
        </div>
      )}
    </div>
  );
}

// ─── GLOBE ───
function Globe({active,onClick,mode="classification"}){
  const mRef=useRef(null);const fRef=useRef(null);
  useEffect(()=>{
    const c=mRef.current;if(!c)return;
    const w=c.clientWidth,h=c.clientHeight;
    const scene=new THREE.Scene();
    const cam=new THREE.PerspectiveCamera(45,w/h,0.1,1000);cam.position.z=3;
    const r=new THREE.WebGLRenderer({antialias:true,alpha:true});
    r.setSize(w,h);r.setPixelRatio(Math.min(window.devicePixelRatio,2));r.setClearColor(0,0);
    c.appendChild(r.domElement);
    const g=new THREE.Group();scene.add(g);
    g.add(new THREE.Mesh(new THREE.SphereGeometry(1,64,64),new THREE.MeshBasicMaterial({color:0xffffff,wireframe:true,transparent:true,opacity:0.012})));
    g.add(new THREE.Mesh(new THREE.SphereGeometry(1.12,64,64),new THREE.ShaderMaterial({vertexShader:`varying vec3 vN;void main(){vN=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,fragmentShader:`varying vec3 vN;void main(){float i=pow(0.6-dot(vN,vec3(0,0,1)),3.0);gl_FragColor=vec4(1,1,1,i*0.12);}`,blending:THREE.AdditiveBlending,side:THREE.BackSide,transparent:true})));
    const borderMat=new THREE.LineBasicMaterial({color:0xffffff,transparent:true,opacity:0.22});
    function drawFeatures(features){features.forEach(f=>{const geom=f.geometry;if(!geom)return;const polys=geom.type==="Polygon"?[geom.coordinates]:geom.type==="MultiPolygon"?geom.coordinates:[];polys.forEach(poly=>{poly.forEach(ring=>{if(ring.length<2)return;const pts=ring.map(([lng,lat])=>ll2v(lat,lng,1.003));g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts),borderMat));});});});}
    function drawFallback(){Object.values(OL).forEach(coords=>{const pts=coords.map(([a,b])=>ll2v(a,b,1.002));pts.push(pts[0]);g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts),borderMat));});}
    const ts=document.createElement("script");
    ts.src="https://cdn.jsdelivr.net/npm/topojson-client@3/dist/topojson-client.min.js";
    ts.onload=()=>{fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json").then(res=>res.json()).then(world=>{drawFeatures(window.topojson.feature(world,world.objects.countries).features);}).catch(drawFallback);};
    ts.onerror=drawFallback;
    document.head.appendChild(ts);
    // ─── MODE-SPECIFIC GLOBE VISUALS ───
    const modeVfx=[];
    if(mode==="cable_fragility"){
      // Submarine cable arcs
      const CABLE_ROUTES=[[43,5,31,30,0],[31,30,12,43,1],[12,43,19,73,0],[19,73,1,104,0],[1,104,22,114,0],[54,-2,42,-70,0],[-34,18,6,-18,0],[-1,38,12,43,0],[25,55,19,73,1],[6,3,39,-8,0],[-14,-51,-12,18,0],[31,30,24,45,0],[36,128,36,138,0],[-27,133,1,104,0],[22,114,36,138,0],[1,104,-6,106,0],[43,5,39,-8,0],[42,-70,25,-80,0]];
      function makeArc(la1,lo1,la2,lo2,choke){
        const p1=ll2v(la1,lo1,1.005),p2=ll2v(la2,lo2,1.005);
        const mid=new THREE.Vector3().addVectors(p1,p2).multiplyScalar(0.5);
        const dist=p1.distanceTo(p2);
        mid.normalize().multiplyScalar(1.005+dist*0.28);
        const curve=new THREE.QuadraticBezierCurve3(p1,mid,p2);
        const pts=curve.getPoints(48);
        const geo=new THREE.BufferGeometry().setFromPoints(pts);
        const mat=new THREE.LineBasicMaterial({color:choke?0xff6644:0x4488ff,transparent:true,opacity:choke?0.35:0.18,linewidth:1});
        const line=new THREE.Line(geo,mat);
        g.add(line);
        // Glow duplicate
        const mat2=new THREE.LineBasicMaterial({color:choke?0xff4422:0x66aaff,transparent:true,opacity:choke?0.12:0.06,linewidth:1});
        g.add(new THREE.Line(geo.clone(),mat2));
        return {line,mat,choke,pts};
      }
      const cableLines=CABLE_ROUTES.map(([a,b,c,d,ch])=>makeArc(a,b,c,d,ch===1));
      // Chokepoint markers — Red Sea & Hormuz
      const chokepoints=[[21,39,"Red Sea"],[26,56,"Hormuz"]];
      const chokeMeshes=[];
      chokepoints.forEach(([la,lo])=>{
        const p=ll2v(la,lo,1.015);
        const rm=new THREE.Mesh(new THREE.RingGeometry(0.04,0.065,32),new THREE.MeshBasicMaterial({color:0xff4422,transparent:true,opacity:0.3,side:THREE.DoubleSide}));
        rm.position.copy(p);rm.lookAt(0,0,0);g.add(rm);
        const rm2=new THREE.Mesh(new THREE.RingGeometry(0.07,0.085,32),new THREE.MeshBasicMaterial({color:0xff4422,transparent:true,opacity:0.1,side:THREE.DoubleSide}));
        rm2.position.copy(p);rm2.lookAt(0,0,0);g.add(rm2);
        chokeMeshes.push({inner:rm,outer:rm2});
      });
      // Traveling pulse particles along cables
      const pulseGeo=new THREE.SphereGeometry(0.006,6,6);
      const pulseMat=new THREE.MeshBasicMaterial({color:0x88ccff,transparent:true,opacity:0.6});
      const pulses=cableLines.filter(c=>!c.choke).map((c,i)=>{
        const mesh=new THREE.Mesh(pulseGeo,pulseMat.clone());
        g.add(mesh);return{mesh,pts:c.pts,offset:i*0.13};
      });
      modeVfx.push({type:"cables",cableLines,chokeMeshes,pulses});
    }
    if(mode==="structural_power"||mode==="grid_friction"){
      // Green/red atmospheric glow
      const powColor=mode==="structural_power"?[0.2,1.0,0.5]:[1.0,0.3,0.2];
      const powGlow=new THREE.Mesh(new THREE.SphereGeometry(1.14,64,64),new THREE.ShaderMaterial({
        vertexShader:`varying vec3 vN;void main(){vN=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
        fragmentShader:`varying vec3 vN;uniform vec3 uCol;void main(){float i=pow(0.55-dot(vN,vec3(0,0,1)),3.0);gl_FragColor=vec4(uCol,i*0.18);}`,
        uniforms:{uCol:{value:new THREE.Vector3(powColor[0],powColor[1],powColor[2])}},
        blending:THREE.AdditiveBlending,side:THREE.BackSide,transparent:true}));
      g.add(powGlow);
      // Energy latitude rings
      const ringColor=mode==="structural_power"?0x22ff88:0xff4422;
      const ringOp=mode==="structural_power"?0.06:0.04;
      [-60,-30,0,30,60].forEach(lat=>{
        const pts=[];for(let lo=-180;lo<=180;lo+=4){pts.push(ll2v(lat,lo,1.004));}
        const geo=new THREE.BufferGeometry().setFromPoints(pts);
        const mat=new THREE.LineBasicMaterial({color:ringColor,transparent:true,opacity:ringOp});
        g.add(new THREE.Line(geo,mat));
      });
      // Meridian lines
      [-120,-60,0,60,120].forEach(lo=>{
        const pts=[];for(let la=-80;la<=80;la+=4){pts.push(ll2v(la,lo,1.004));}
        const geo=new THREE.BufferGeometry().setFromPoints(pts);
        const mat=new THREE.LineBasicMaterial({color:ringColor,transparent:true,opacity:ringOp*0.7});
        g.add(new THREE.Line(geo,mat));
      });
      // Power node markers at high-P2C countries
      const powerNodes=[];
      Object.entries(C).forEach(([id,co])=>{
        if(!co.sc)return;
        const val=mode==="structural_power"?co.sc.p2c:(100-co.sc.p2c);
        if(val<30)return;
        const intensity=val/100;
        const p=ll2v(co.la,co.lo,1.012);
        const nm=new THREE.Mesh(new THREE.SphereGeometry(0.012+intensity*0.015,12,12),
          new THREE.MeshBasicMaterial({color:ringColor,transparent:true,opacity:0.15+intensity*0.3}));
        nm.position.copy(p);g.add(nm);
        powerNodes.push({mesh:nm,intensity});
      });
      modeVfx.push({type:"power",powerNodes,ringColor});
    }
    if(mode==="large_load_politics"){
      // Purple atmospheric tint
      const loadGlow=new THREE.Mesh(new THREE.SphereGeometry(1.13,64,64),new THREE.ShaderMaterial({
        vertexShader:`varying vec3 vN;void main(){vN=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
        fragmentShader:`varying vec3 vN;void main(){float i=pow(0.5-dot(vN,vec3(0,0,1)),3.0);gl_FragColor=vec4(0.6,0.4,1.0,i*0.12);}`,
        blending:THREE.AdditiveBlending,side:THREE.BackSide,transparent:true}));
      g.add(loadGlow);
      modeVfx.push({type:"load"});
    }
    if(mode==="localization_pressure"){
      // Amber regulatory pressure rings around high-LPS countries
      const regNodes=[];
      Object.entries(C).forEach(([id,co])=>{
        if(!co.sc||co.sc.lps<30)return;
        const intensity=co.sc.lps/100;
        const p=ll2v(co.la,co.lo,1.02);
        const nm=new THREE.Mesh(new THREE.RingGeometry(0.025,0.025+intensity*0.03,24),
          new THREE.MeshBasicMaterial({color:0xffaa33,transparent:true,opacity:0.08+intensity*0.2,side:THREE.DoubleSide}));
        nm.position.copy(p);nm.lookAt(0,0,0);g.add(nm);
        regNodes.push({mesh:nm,intensity});
      });
      modeVfx.push({type:"regulation",regNodes});
    }
    // ─── PEERINGDB METRO CLUSTER RENDERING ───
    const isPdb=mode.startsWith("pdb_");
    if(isPdb){
      const pdbColor=getModeColor(mode);const pp=pdbColor.match(/[\d.]+/g)||[];
      const pR=parseFloat(pp[0]||200)/255,pG=parseFloat(pp[1]||200)/255,pB=parseFloat(pp[2]||255)/255;
      const pCol=new THREE.Color(pR,pG,pB);
      // Atmospheric glow
      const pGlow=new THREE.Mesh(new THREE.SphereGeometry(1.13,64,64),new THREE.ShaderMaterial({
        vertexShader:"varying vec3 vN;void main(){vN=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",
        fragmentShader:"varying vec3 vN;uniform vec3 uC;void main(){float i=pow(0.5-dot(vN,vec3(0,0,1)),3.0);gl_FragColor=vec4(uC,i*0.14);}",
        uniforms:{uC:{value:new THREE.Vector3(pR,pG,pB)}},
        blending:THREE.AdditiveBlending,side:THREE.BackSide,transparent:true}));
      g.add(pGlow);
      // Metro nodes
      const pdbNodes=[];
      PDB_METROS.forEach(([city,lat,lng,ix,fac,net,tier])=>{
        let val=0;
        if(mode==="pdb_exchange")val=Math.min(1,ix/12);
        else if(mode==="pdb_facility")val=Math.min(1,fac/65);
        else if(mode==="pdb_network")val=Math.min(1,net/2800);
        else if(mode==="pdb_depth")val=Math.min(1,(ix/12*0.3+fac/65*0.3+net/2800*0.4));
        else if(mode==="pdb_chokepoint"){
          // Higher for low-tier with few resources
          val=tier>=3?(0.3+Math.random()*0.4):tier===2?0.2:0.05;
          if(lat>10&&lat<35&&lng>30&&lng<80)val=Math.min(1,val+0.3); // Red Sea/Gulf
        }
        else if(mode==="pdb_composite")val=Math.min(1,(ix/12*0.25+fac/65*0.25+net/2800*0.35+((4-tier)/3)*0.15));
        if(val<0.01)return;
        const r2=1.008;const pos=ll2v(lat,lng,r2);
        // Main node
        const sz=0.003+val*0.018;
        const nm=new THREE.Mesh(new THREE.SphereGeometry(sz,8,8),new THREE.MeshBasicMaterial({color:pCol,transparent:true,opacity:0.1+val*0.5}));
        nm.position.copy(pos);g.add(nm);
        // Outer halo for tier 1-2
        if(tier<=2&&val>0.15){
          const halo=new THREE.Mesh(new THREE.RingGeometry(sz*1.5,sz*2.2,16),new THREE.MeshBasicMaterial({color:pCol,transparent:true,opacity:0.04+val*0.12,side:THREE.DoubleSide}));
          halo.position.copy(pos);halo.lookAt(0,0,0);g.add(halo);
        }
        // Pillar for significant metros
        if(val>0.08){
          const h2=val*0.15;const tip=ll2v(lat,lng,r2+h2);
          const lg=new THREE.BufferGeometry().setFromPoints([pos,tip]);
          const lm=new THREE.LineBasicMaterial({color:pCol,transparent:true,opacity:0.06+val*0.2});
          g.add(new THREE.Line(lg,lm));
        }
        pdbNodes.push({mesh:nm,val});
      });
      // Interconnection arcs between mega metros
      if(mode==="pdb_depth"||mode==="pdb_composite"||mode==="pdb_network"){
        const megaMetros=PDB_METROS.filter(m2=>m2[6]===1).slice(0,12);
        for(let i=0;i<megaMetros.length;i++){
          for(let j=i+1;j<megaMetros.length;j++){
            if(Math.random()>0.35)continue; // selective connections
            const a=megaMetros[i],b=megaMetros[j];
            const p1=ll2v(a[1],a[2],1.005),p2=ll2v(b[1],b[2],1.005);
            const mid=new THREE.Vector3().addVectors(p1,p2).multiplyScalar(0.5);
            const dist=p1.distanceTo(p2);
            mid.normalize().multiplyScalar(1.005+dist*0.18);
            const curve=new THREE.QuadraticBezierCurve3(p1,mid,p2);
            const pts=curve.getPoints(32);
            const geo=new THREE.BufferGeometry().setFromPoints(pts);
            g.add(new THREE.Line(geo,new THREE.LineBasicMaterial({color:pCol,transparent:true,opacity:0.04})));
          }
        }
      }
      modeVfx.push({type:"pdb",pdbNodes});
    }
    // Mode-aware country dot rendering
    const mc=getModeColor(mode);const mParts=mc.match(/[\d.]+/g)||[];const mR=parseFloat(mParts[0]||255)/255,mG=parseFloat(mParts[1]||255)/255,mB=parseFloat(mParts[2]||255)/255;
    const dotColor=mode==="classification"?0xffffff:new THREE.Color(mR,mG,mB);
    GC.forEach(([,lat,lng,bk])=>{const b=BUCKETS[bk];if(!b)return;const op=bk>=8?(mode==="classification"?0.06:Math.min(0.15,getGCModeOpacity(bk,mode))):Math.min(1,getGCModeOpacity(bk,mode));if(op<=0)return;const sz=bk>=8?0.004:(mode==="classification"?b.sz:Math.max(0.003,b.sz*(0.5+op*0.8)));const pos=ll2v(lat,lng,1.007);g.add(new THREE.Mesh(new THREE.SphereGeometry(sz,6,6),new THREE.MeshBasicMaterial({color:dotColor,transparent:true,opacity:op})).translateX(pos.x).translateY(pos.y).translateZ(pos.z));});
    // Tracked country markers — mode-aware intensity
    const hs=[];Object.entries(C).forEach(([id,co])=>{const pos=ll2v(co.la,co.lo,1.04);const hit=new THREE.Mesh(new THREE.SphereGeometry(0.07,16,16),new THREE.MeshBasicMaterial({visible:false}));hit.position.copy(pos);hit.userData={cid:id};g.add(hit);
    const ms2=getCountryModeScore(id,mode);const mOp=ms2!=null?0.15+ms2*0.7:(active===id)?0.7:0.2;
    const ring=new THREE.Mesh(new THREE.RingGeometry(0.03,0.045,32),new THREE.MeshBasicMaterial({color:dotColor,transparent:true,opacity:(active===id)?0.8:mOp,side:THREE.DoubleSide}));ring.position.copy(pos);ring.lookAt(0,0,0);g.add(ring);const dot=new THREE.Mesh(new THREE.SphereGeometry(0.018,16,16),new THREE.MeshBasicMaterial({color:dotColor,transparent:true,opacity:(active===id)?1:Math.min(1,mOp+0.2)}));dot.position.copy(pos);dot.userData={cid:id};g.add(dot);hs.push({ring,dot});});
    // ─── SCORE PILLARS for all non-irrelevant countries ───
    if(mode!=="classification"){
      const scoreKey=mode==="cable_fragility"?"ccr":mode==="localization_pressure"?"lps":mode==="grid_friction"?"p2c":mode==="large_load_politics"?"ovr":"p2c";
      const invert=mode==="cable_fragility"||mode==="grid_friction";
      const pillarNodes=[];
      // Tracked countries — use actual scores
      Object.entries(C).forEach(([id,co])=>{
        if(!co.sc||co.sc[scoreKey]==null)return;
        const raw=co.sc[scoreKey];const val=invert?(100-raw):raw;
        if(val<8)return;
        const norm=val/100;const h=norm*0.22;
        const base=ll2v(co.la,co.lo,1.008);const tip=ll2v(co.la,co.lo,1.008+h);
        const geo=new THREE.BufferGeometry().setFromPoints([base,tip]);
        const mat=new THREE.LineBasicMaterial({color:dotColor,transparent:true,opacity:0.15+norm*0.35});
        g.add(new THREE.Line(geo,mat));
        // Tip glow
        const tm=new THREE.Mesh(new THREE.SphereGeometry(0.005+norm*0.008,6,6),new THREE.MeshBasicMaterial({color:dotColor,transparent:true,opacity:0.2+norm*0.4}));
        tm.position.copy(tip);g.add(tm);
        pillarNodes.push({mat,tipMesh:tm,norm});
      });
      // Untracked non-irrelevant — use GC_SCORES
      GC.forEach(([name,lat,lng,bk])=>{
        if(bk>=8)return;
        // Skip if already tracked in C
        const isTracked=Object.values(C).some(co=>co.n===name);
        if(isTracked)return;
        const sc=GC_SCORES[name];if(!sc)return;
        const scoreMap={csi:0,p2c:1,lps:2,ccr:3,ovr:4};
        const raw=sc[scoreMap[scoreKey]];if(raw==null)return;
        const val=invert?(100-raw):raw;
        if(val<8)return;
        const norm=val/100;const h=norm*0.16;
        const base=ll2v(lat,lng,1.008);const tip=ll2v(lat,lng,1.008+h);
        const geo=new THREE.BufferGeometry().setFromPoints([base,tip]);
        const mat=new THREE.LineBasicMaterial({color:dotColor,transparent:true,opacity:0.08+norm*0.22});
        g.add(new THREE.Line(geo,mat));
        // Smaller tip dot for untracked
        const tm=new THREE.Mesh(new THREE.SphereGeometry(0.003+norm*0.005,6,6),new THREE.MeshBasicMaterial({color:dotColor,transparent:true,opacity:0.12+norm*0.25}));
        tm.position.copy(tip);g.add(tm);
        pillarNodes.push({mat,tipMesh:tm,norm});
      });
      modeVfx.push({type:"pillars",pillarNodes});
    }
    let dr=false,pv={x:0,y:0},vl={x:0,y:0},tg={x:0.2,y:0},ds={x:0,y:0};const rc=new THREE.Raycaster(),ms=new THREE.Vector2(),el=r.domElement;
    const oD=(e)=>{dr=true;const cx=e.clientX||e.touches?.[0]?.clientX||0,cy=e.clientY||e.touches?.[0]?.clientY||0;pv={x:cx,y:cy};vl={x:0,y:0};ds={x:cx,y:cy};};const oM=(e)=>{if(!dr)return;const x=e.clientX||e.touches?.[0]?.clientX||0,y=e.clientY||e.touches?.[0]?.clientY||0;vl.x=(y-pv.y)*0.003;vl.y=(x-pv.x)*0.003;tg.x+=vl.x;tg.y+=vl.y;pv={x,y};};const oU=()=>{dr=false;};
    const oC=(e)=>{const dx=e.clientX-ds.x,dy=e.clientY-ds.y;if(Math.sqrt(dx*dx+dy*dy)>8)return;const rect=el.getBoundingClientRect();ms.x=((e.clientX-rect.left)/rect.width)*2-1;ms.y=-((e.clientY-rect.top)/rect.height)*2+1;rc.setFromCamera(ms,cam);for(const h of rc.intersectObjects(g.children,false)){if(h.object.userData?.cid){onClick(h.object.userData.cid);return;}}};
    el.addEventListener("mousedown",oD);el.addEventListener("mousemove",oM);el.addEventListener("mouseup",oU);el.addEventListener("mouseleave",oU);el.addEventListener("touchstart",oD,{passive:true});el.addEventListener("touchmove",oM,{passive:true});el.addEventListener("touchend",oU);el.addEventListener("click",oC);
    let t=0;const anim=()=>{fRef.current=requestAnimationFrame(anim);t+=0.02;if(!dr){tg.y+=0.001;vl.x*=0.95;vl.y*=0.95;tg.x+=vl.x;tg.y+=vl.y;}tg.x=Math.max(-1.2,Math.min(1.2,tg.x));g.rotation.x+=(tg.x-g.rotation.x)*0.05;g.rotation.y+=(tg.y-g.rotation.y)*0.05;hs.forEach((h,i)=>{const p=Math.sin(t+i*1.2)*0.5+0.5;h.ring.material.opacity=0.12+p*0.15;const s=1+p*0.12;h.dot.scale.set(s,s,s);});
    // Animate mode VFX
    modeVfx.forEach(vfx=>{
      if(vfx.type==="cables"){
        // Pulse particles traveling along cables
        vfx.pulses.forEach(p=>{const idx=Math.floor(((t*0.4+p.offset)%1)*p.pts.length);const pt=p.pts[Math.min(idx,p.pts.length-1)];p.mesh.position.copy(pt);p.mesh.material.opacity=0.3+Math.sin(t*3+p.offset*10)*0.3;});
        // Chokepoint pulse
        vfx.chokeMeshes.forEach(c=>{const pulse=Math.sin(t*2)*0.5+0.5;c.inner.material.opacity=0.15+pulse*0.25;c.outer.material.opacity=0.04+pulse*0.1;const s=1+pulse*0.15;c.outer.scale.set(s,s,s);});
        // Cable opacity shimmer
        vfx.cableLines.forEach((c,i)=>{c.mat.opacity=c.choke?(0.2+Math.sin(t*1.5+i)*0.15):(0.1+Math.sin(t*0.8+i*0.5)*0.08);});
      }
      if(vfx.type==="power"){vfx.powerNodes.forEach((n,i)=>{const p=Math.sin(t*1.5+i*0.8)*0.5+0.5;n.mesh.material.opacity=(0.1+n.intensity*0.25)+p*0.1;const s=1+p*0.08;n.mesh.scale.set(s,s,s);});}
      if(vfx.type==="regulation"){vfx.regNodes.forEach((n,i)=>{const p=Math.sin(t+i*1.4)*0.5+0.5;n.mesh.material.opacity=(0.05+n.intensity*0.15)+p*0.08;const s=1+p*0.1;n.mesh.scale.set(s,s,s);});}
      if(vfx.type==="pillars"){vfx.pillarNodes.forEach((n,i)=>{const p=Math.sin(t*1.2+i*0.3)*0.5+0.5;n.tipMesh.material.opacity=(0.1+n.norm*0.25)+p*0.12;const s=1+p*0.15;n.tipMesh.scale.set(s,s,s);});}
      if(vfx.type==="pdb"){vfx.pdbNodes.forEach((n,i)=>{const p=Math.sin(t*0.8+i*0.4)*0.5+0.5;n.mesh.material.opacity=(0.08+n.val*0.4)+p*0.08;const s=1+p*0.1;n.mesh.scale.set(s,s,s);});}
    });
    r.render(scene,cam);};anim();
    const hR=()=>{const nw=c.clientWidth,nh=c.clientHeight;cam.aspect=nw/nh;cam.updateProjectionMatrix();r.setSize(nw,nh);};window.addEventListener("resize",hR);
    return ()=>{cancelAnimationFrame(fRef.current);window.removeEventListener("resize",hR);el.removeEventListener("mousedown",oD);el.removeEventListener("mousemove",oM);el.removeEventListener("mouseup",oU);el.removeEventListener("mouseleave",oU);el.removeEventListener("touchstart",oD);el.removeEventListener("touchmove",oM);el.removeEventListener("touchend",oU);el.removeEventListener("click",oC);c.removeChild(r.domElement);r.dispose();};
  },[active,onClick,mode]);
  return (<div ref={mRef} style={{width:"100%",height:"100%",cursor:"grab"}} onMouseDown={(e)=>e.currentTarget.style.cursor="grabbing"} onMouseUp={(e)=>e.currentTarget.style.cursor="grab"} />);
}



// ─── DOMAIN CONFIG ───

// ─── GLOBE MODE BUTTONS ───
function GlobeModeButtons({activeMode,setMode}){
  return (
    <div style={{display:"flex",gap:3,flexWrap:"wrap",marginBottom:12}}>
      {GLOBE_MODES.map(m=>{
        const active=activeMode===m.id;
        return (<button key={m.id} onClick={()=>setMode(m.id)}
          style={{fontFamily:"'SF Mono',monospace",fontSize:7,letterSpacing:"0.06em",cursor:"pointer",
            transition:"all 0.2s",fontWeight:active?600:400,whiteSpace:"nowrap",
            color:active?"#000":m.color,
            background:active?m.color:"transparent",
            border:`1px solid ${active?m.color:dimColor(m.color,"0.2")}`,
            padding:"3px 8px",borderRadius:3}}>
          {m.short}
        </button>);
      })}
    </div>
  );
}

// ─── GLOBE MODE SIDE PANEL ───
function GlobeModePanel({modeId}){
  const m=GLOBE_MODE_MAP[modeId];
  if(!m)return null;
  const isPdb=modeId.startsWith("pdb_");
  const signals=WEEKLY_SIGNALS.filter(s=>s.modeId===modeId).slice(0,4);
  // Top metros for PDB modes
  const topMetros=isPdb?PDB_METROS.filter(m2=>m2[6]<=2).sort((a,b)=>{
    if(modeId==="pdb_exchange")return b[3]-a[3];
    if(modeId==="pdb_facility")return b[4]-a[4];
    if(modeId==="pdb_network")return b[5]-a[5];
    if(modeId==="pdb_chokepoint")return a[6]-b[6]; // lower tier = less choke risk, but we want high-risk
    return (b[3]+b[4]+b[5])-(a[3]+a[4]+a[5]);
  }).slice(0,5):[];
  return (
    <div style={{marginTop:14,padding:"10px 12px",background:"rgba(255,255,255,0.015)",border:"1px solid "+dimColor(m.color,"0.12"),borderRadius:6}}>
      <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
        <div style={{width:6,height:6,borderRadius:"50%",background:m.color}} />
        <span style={{fontFamily:"'SF Mono',monospace",fontSize:8,color:m.color,letterSpacing:"0.08em"}}>{m.legendTitle.toUpperCase()}</span>
      </div>
      <p style={{fontFamily:"'Inter',sans-serif",fontSize:10,color:"rgba(255,255,255,0.35)",lineHeight:1.5,margin:"0 0 8px"}}>{m.description}</p>
      {m.sourceFamilies.length>0&&<div style={{display:"flex",gap:3,flexWrap:"wrap",marginBottom:8}}>
        {m.sourceFamilies.map((sf,i)=>(
          <span key={i} style={{fontFamily:"'SF Mono',monospace",fontSize:7,color:"rgba(255,255,255,0.2)",background:"rgba(255,255,255,0.03)",padding:"1px 5px",borderRadius:2,border:"1px solid rgba(255,255,255,0.05)"}}>
            {sf}
          </span>
        ))}
        <span style={{fontFamily:"'SF Mono',monospace",fontSize:7,color:"rgba(255,255,255,0.15)"}}>{"-> "+m.tiedScores.map(s=>s.toUpperCase()).join(" + ")}</span>
      </div>}
      {/* PDB metro highlights */}
      {isPdb&&topMetros.length>0&&<div style={{marginBottom:8}}>
        <div style={{fontFamily:"'SF Mono',monospace",fontSize:7,color:"rgba(255,255,255,0.15)",marginBottom:4,letterSpacing:"0.08em"}}>TOP METROS</div>
        {topMetros.map((mt,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:6,marginBottom:3,padding:"3px 6px",background:"rgba(255,255,255,0.02)",borderRadius:3}}>
            <span style={{fontFamily:"'Inter',sans-serif",fontSize:9,color:"rgba(255,255,255,0.6)",flex:1}}>{mt[0]}</span>
            <span style={{fontFamily:"'SF Mono',monospace",fontSize:7,color:dimColor(m.color,"0.6")}}>{mt[3]} IX</span>
            <span style={{fontFamily:"'SF Mono',monospace",fontSize:7,color:"rgba(255,255,255,0.2)"}}>{mt[4]} fac</span>
            <span style={{fontFamily:"'SF Mono',monospace",fontSize:7,color:"rgba(255,255,255,0.15)"}}>{mt[5].toLocaleString()} net</span>
          </div>
        ))}
      </div>}
      {/* PDB attribution */}
      {isPdb&&<div style={{display:"flex",alignItems:"center",gap:4,marginBottom:8,padding:"4px 8px",background:"rgba(0,200,255,0.03)",border:"1px solid rgba(0,200,255,0.08)",borderRadius:4}}>
        <span style={{fontFamily:"'SF Mono',monospace",fontSize:7,color:"rgba(0,200,255,0.5)"}}>DATA</span>
        <a href="https://www.peeringdb.com" target="_blank" rel="noopener noreferrer" style={{fontFamily:"'SF Mono',monospace",fontSize:7,color:"rgba(0,200,255,0.6)",textDecoration:"none"}}>PeeringDB ↗</a>
        <span style={{fontFamily:"'SF Mono',monospace",fontSize:6,color:"rgba(255,255,255,0.12)"}}>Used under permission. Tatari inferences are not PeeringDB claims.</span>
      </div>}
      {signals.length>0&&<div>
        <div style={{fontFamily:"'SF Mono',monospace",fontSize:7,color:"rgba(255,255,255,0.15)",marginBottom:4,letterSpacing:"0.08em"}}>RECENT SIGNALS</div>
        {signals.map(s=>(
          <div key={s.id} style={{marginBottom:5,paddingLeft:6,borderLeft:"2px solid "+dimColor(m.color,"0.15")}}>
            <div style={{fontFamily:"'Inter',sans-serif",fontSize:9,color:"rgba(255,255,255,0.5)",lineHeight:1.4}}>{s.headline}</div>
            <div style={{display:"flex",gap:4,marginTop:2}}>
              <span style={{fontFamily:"'SF Mono',monospace",fontSize:7,color:s.epistemic==="FACT"?"rgba(150,255,150,0.4)":"rgba(255,200,100,0.3)"}}>{s.epistemic}</span>
              <span style={{fontFamily:"'SF Mono',monospace",fontSize:7,color:"rgba(255,255,255,0.12)"}}>{s.week}</span>
              {s.sourceUrl&&<a href={s.sourceUrl} target="_blank" rel="noopener noreferrer" style={{fontFamily:"'SF Mono',monospace",fontSize:7,color:"rgba(100,180,255,0.4)",textDecoration:"none"}}>{"-> "+s.tracker}</a>}
            </div>
          </div>
        ))}
      </div>}
      <div style={{fontFamily:"'SF Mono',monospace",fontSize:7,color:"rgba(255,255,255,0.1)",marginTop:6,fontStyle:"italic"}}>{m.methodologyNote}</div>
    </div>
  );
}

function BLeg(){return (<div style={{display:"flex",flexWrap:"wrap",gap:3,justifyContent:"center"}}>{Object.entries(BUCKETS).map(([k,b])=>(<div key={k} style={{display:"flex",alignItems:"center",gap:3,padding:"2px 6px",background:"rgba(255,255,255,0.015)",borderRadius:3,border:"1px solid rgba(255,255,255,0.04)"}}><div style={{width:5,height:5,borderRadius:"50%",background:`rgba(255,255,255,${b.op})`}} /><span style={{fontFamily:"'SF Mono',monospace",fontSize:7,color:"rgba(255,255,255,0.25)"}}>{b.short}</span></div>))}</div>);}

// Bucket accent colors for filter buttons
const BK_COLORS={
  1:"rgba(120,200,255,0.7)",  // Core — bright blue
  2:"rgba(100,220,180,0.7)",  // Sovereign — teal
  3:"rgba(160,255,160,0.7)",  // Gateway — green
  4:"rgba(255,220,80,0.7)",   // Emerging — amber
  5:"rgba(255,170,60,0.7)",   // Frontier — orange
  6:"rgba(200,160,255,0.7)",  // Edge — purple
  7:"rgba(255,120,120,0.7)",  // Constrained — red
  8:"rgba(120,120,120,0.5)",  // Excluded — gray
};

function ClassView(){
  const[fb,setFb]=useState(0);
  const fl=fb===0?GC:GC.filter(c=>c[3]===fb);
  return (<div className="ti-class-wrap" style={{paddingTop:80,maxWidth:880,margin:"0 auto",padding:"80px 36px 50px"}}>
    <div style={{fontFamily:"'SF Mono',monospace",fontSize:9,color:"rgba(255,255,255,0.2)",letterSpacing:"0.14em",marginBottom:6}}>GLOBAL CLASSIFICATION</div>
    <h2 style={{fontFamily:"'Instrument Serif',Georgia,serif",fontSize:24,fontWeight:400,color:"#fff",margin:"0 0 4px"}}>Compute Relevance</h2>
    <p style={{fontFamily:"'Inter',sans-serif",fontSize:11,color:"rgba(255,255,255,0.25)",marginBottom:16}}>{GC.length} countries · 8 buckets · Compute-first lens</p>
    <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:16}}>
      <button onClick={()=>setFb(0)} style={{
        fontFamily:"'SF Mono',monospace",fontSize:8,cursor:"pointer",padding:"5px 10px",borderRadius:4,
        color:fb===0?"#000":"rgba(255,255,255,0.35)",
        background:fb===0?"rgba(255,255,255,0.9)":"transparent",
        border:`1px solid ${fb===0?"rgba(255,255,255,0.9)":"rgba(255,255,255,0.1)"}`,
        fontWeight:fb===0?600:400,
      }}>All ({GC.length})</button>
      {Object.entries(BUCKETS).map(([k,b])=>{
        const n=Number(k);
        const ct=GC.filter(c=>c[3]===n).length;
        const col=BK_COLORS[n];
        const active=fb===n;
        return (<button key={k} onClick={()=>setFb(n)} style={{
          fontFamily:"'SF Mono',monospace",fontSize:8,cursor:"pointer",padding:"5px 10px",borderRadius:4,
          color:active?"#000":col,
          background:active?col:"transparent",
          border:`1px solid ${active?col:col.replace("0.7","0.2").replace("0.5","0.15")}`,
          fontWeight:active?600:400,
          transition:"all 0.15s",
        }}>{b.short} ({ct})</button>);
      })}
    </div>
    {/* Active bucket description */}
    {fb!==0&&<div style={{marginBottom:14,padding:"6px 10px",background:"rgba(255,255,255,0.02)",border:`1px solid ${BK_COLORS[fb]?.replace("0.7","0.1")||"rgba(255,255,255,0.05)"}`,borderRadius:5}}>
      <span style={{fontFamily:"'SF Mono',monospace",fontSize:8,color:BK_COLORS[fb]||"rgba(255,255,255,0.4)"}}>{BUCKETS[fb].name}</span>
      <span style={{fontFamily:"'Inter',sans-serif",fontSize:10,color:"rgba(255,255,255,0.3)",marginLeft:8}}>{fl.length} countries</span>
    </div>}
    {RO.map(reg=>{
      const rc=fl.filter(c=>c[4]===reg);
      if(!rc.length)return null;
      return (<div key={reg} style={{marginBottom:20}}>
        <div style={{fontFamily:"'SF Mono',monospace",fontSize:8,color:"rgba(255,255,255,0.2)",marginBottom:6}}>{RN[reg]}</div>
        <table style={{width:"100%",borderCollapse:"collapse"}}><tbody>
          {rc.sort((a,b)=>a[3]-b[3]).map(([n,,,bk])=>{
            const b=BUCKETS[bk];
            const col=BK_COLORS[bk];
            return (<tr key={n} style={{borderBottom:"1px solid rgba(255,255,255,0.025)"}}>
              <td style={{padding:"5px 8px",fontFamily:"'Inter',sans-serif",fontSize:11,color:"rgba(255,255,255,0.7)",width:"40%"}}>{n}</td>
              <td style={{padding:"5px 8px",width:"8%"}}><div style={{width:6,height:6,borderRadius:"50%",background:col||`rgba(255,255,255,${b.op})`}} /></td>
              <td style={{padding:"5px 8px",fontFamily:"'SF Mono',monospace",fontSize:9,color:col||`rgba(255,255,255,${Math.max(0.2,b.op)})`}}>{b.name}</td>
            </tr>);
          })}
        </tbody></table>
      </div>);
    })}
  </div>);
}

// ─── EXTERNAL SIGNAL FEED ───
// Real sources across 7 domains · ~3/day · Aug 2025 → Apr 2026
const LIVE_SIGNALS=[
// ─── APR 13 ───
{d:"Apr 13, 2026",dm:"Regulation",t:"CBS: nationwide DC boom stirs community resistance — 4,000+ in operation, 3,000 more planned or under construction",s:"CBS News",u:"https://www.cbsnews.com/news/nationwide-boom-in-ai-data-centers-stirs-resistance/"},
{d:"Apr 13, 2026",dm:"Compute",t:"Hitachi and MOL to launch floating data centers by 2027 — maritime compute infrastructure emerges",s:"Data Center Knowledge",u:"https://www.datacenterknowledge.com/data-center-construction/new-data-center-developments-april-2026"},
{d:"Apr 13, 2026",dm:"Power",t:"PJM announces $11.8B transmission expansion plan to support AI data center demand in mid-Atlantic",s:"Data Center World",u:"https://datacenterworld.com/news-insights/"},
// ─── APR 12 ───
{d:"Apr 12, 2026",dm:"Compute",t:"Crusoe announces 900 MW AI data center in Abilene, Texas for Microsoft workloads — largest single facility",s:"Data Center Knowledge",u:"https://www.datacenterknowledge.com/data-center-construction/new-data-center-developments-april-2026"},
{d:"Apr 12, 2026",dm:"Finance",t:"Moody's: six largest US hyperscalers to spend ~$700B in 2026 — 6x 2022 levels, straining free cash flow",s:"Data Center Knowledge",u:"https://www.datacenterknowledge.com/data-center-construction/new-data-center-developments-april-2026"},
{d:"Apr 12, 2026",dm:"Regulation",t:"Data Centre LIVE 2026 London: 500+ exhibitors confirmed — ABB, Rolls-Royce, Equinix, NTT speaking",s:"GlobeNewswire",u:"https://www.globenewswire.com/news-release/2026/04/10/3271734/0/en/Data-Centre-LIVE-2026-Confirms-Strong-Industry-Demand-with-Sponsorship-Opportunities-Closing-Soon.html"},
// ─── APR 11 ───
{d:"Apr 11, 2026",dm:"Compute",t:"U.S. Army debuts Data Operations Center — military AI compute integration accelerates",s:"Army Times",u:"https://www.armytimes.com/industry/techwatch/2026/04/10/army-debuts-data-operations-center-to-serve-as-information-hub/"},
{d:"Apr 11, 2026",dm:"Power",t:"DoD contracts for commercial data centers on four military bases — Dugway, Fort Bliss, Fort Hood, Fort Bragg",s:"Army Times",u:"https://www.armytimes.com/industry/techwatch/2026/04/10/army-debuts-data-operations-center-to-serve-as-information-hub/"},
{d:"Apr 11, 2026",dm:"Compute",t:"Nebius $10B, 310 MW data center plan signals AI infrastructure shift to non-hyperscaler players",s:"Data Center Knowledge",u:"https://www.datacenterknowledge.com/data-center-construction/new-data-center-developments-april-2026"},
// ─── APR 10 ───
{d:"Apr 10, 2026",dm:"Regulation",t:"Harvard Gazette: communities pushing back against data centers — legitimate concerns over rates, water, environment",s:"Harvard Gazette",u:"https://news.harvard.edu/gazette/story/2026/04/why-are-communities-pushing-back-against-data-centers/"},
{d:"Apr 10, 2026",dm:"Compute",t:"Vietnam first AI data center: 200 MW facility to begin construction end of April 2026",s:"Data Center Knowledge",u:"https://www.datacenterknowledge.com/data-center-construction/new-data-center-developments-april-2026"},
{d:"Apr 10, 2026",dm:"Finance",t:"Australia National Reconstruction Fund pledges AUD 200M to Macquarie Technology for sovereign cloud",s:"Data Center Knowledge",u:"https://www.datacenterknowledge.com/data-center-construction/new-data-center-developments-april-2026"},
// ─── APR 9 ───
{d:"Apr 9, 2026",dm:"Regulation",t:"Australia introduces national framework tying DC approvals to energy investment and resource management",s:"Data Center Knowledge",u:"https://www.datacenterknowledge.com/data-center-construction/new-data-center-developments-april-2026"},
{d:"Apr 9, 2026",dm:"Compute",t:"New Zealand: Datagrid approved for 280 MW hyperscale campus — 78,000 sqm on South Island",s:"Data Center Knowledge",u:"https://www.datacenterknowledge.com/data-center-construction/new-data-center-developments-april-2026"},
{d:"Apr 9, 2026",dm:"Compute",t:"LG Group unveils 'One LG' strategy — AI data centers and energy storage as core focus",s:"Data Center Knowledge",u:"https://www.datacenterknowledge.com/data-center-construction/new-data-center-developments-april-2026"},
// ─── APR 8 ───
{d:"Apr 8, 2026",dm:"Finance",t:"ConstructConnect: Feb 2026 DC spending $11.5B — YTD total $36.9B vs $1.4B in 2025",s:"ConstructConnect",u:"https://news.constructconnect.com/april-2026-data-center-report-extraordinary-growth-continues"},
{d:"Apr 8, 2026",dm:"Compute",t:"Illinois leads 2026 DC starts at $10.3B, followed by Ohio $10B, North Carolina $10B",s:"ConstructConnect",u:"https://news.constructconnect.com/april-2026-data-center-report-extraordinary-growth-continues"},
{d:"Apr 8, 2026",dm:"Power",t:"2026 power infrastructure starts forecast to grow 32% YoY to keep pace with DC energy demand",s:"ConstructConnect",u:"https://news.constructconnect.com/april-2026-data-center-report-extraordinary-growth-continues"},
// ─── APR 7 ───
{d:"Apr 7, 2026",dm:"Cable",t:"Medusa subsea cable: 8,700 km system across 22 nations — Equatorial Guinea reviews landing proposal",s:"Shore Africa",u:"https://shore.africa/2026/04/06/equatorial-guinea-subsea-cable-medusa-internet/"},
{d:"Apr 7, 2026",dm:"Cable",t:"TeleGeography 2026 map: 694 cable systems and 1,893 landings active or under construction globally",s:"TeleGeography",u:"https://submarine-cable-map-2026.telegeography.com/"},
{d:"Apr 7, 2026",dm:"Cable",t:"WACS and SAT-3 damaged off West Africa — Congo Canyon rockfalls, CS Leon Thevenin mobilized from Kenya",s:"DCD",u:"https://www.datacenterdynamics.com/en/news/two-subsea-cables-damaged-in-west-africa-repairs-may-take-weeks/"},
// ─── APR 6 ───
{d:"Apr 6, 2026",dm:"Compute",t:"Meta 1 GW data center in El Paso, Texas — rendering released, among largest single-site global facilities",s:"Data Center Knowledge",u:"https://www.datacenterknowledge.com/data-center-construction/new-data-center-developments-april-2026"},
{d:"Apr 6, 2026",dm:"Power",t:"Bloomberg: US AI DC expansion relies on Chinese electrical equipment imports — transformers, switchgear scarce",s:"Bloomberg",u:"https://www.bloomberg.com/news/features/2026-04-01/us-ai-data-center-expansion-relies-on-chinese-electrical-equipment-imports"},
{d:"Apr 6, 2026",dm:"Regulation",t:"Maryland legislators debate statewide DC policy — Governor Moore: 'I don't believe in the false choice'",s:"Maryland Matters",u:"https://marylandmatters.org/2026/01/03/data-center-regulations-2026/"},
// ─── APR 5 ───
{d:"Apr 5, 2026",dm:"Compute",t:"Stargate Abilene: 1.2 GW OpenAI facility — 6,000 workers, 8 buildings, completion expected 2026",s:"Bloomberg",u:"https://www.bloomberg.com/news/features/2026-04-01/us-ai-data-center-expansion-relies-on-chinese-electrical-equipment-imports"},
{d:"Apr 5, 2026",dm:"Cable",t:"2Africa Pearls extension scheduled to go live 2026 — connects Gulf, Pakistan, India to 45,000 km backbone",s:"2Africa Cable",u:"https://www.2africacable.net/"},
{d:"Apr 5, 2026",dm:"Compute",t:"Telecom Egypt: 330+ Tbps transit capacity, 11 landing points — enables 14 cable landings in 5 years",s:"TeleGeography",u:"https://submarine-cable-map-2026.telegeography.com/"},
// ─── APR 4 ───
{d:"Apr 4, 2026",dm:"Compute",t:"Pew Research: public broadly negative about data centers — electricity rates, water use, tax breaks cited",s:"Harvard Gazette",u:"https://news.harvard.edu/gazette/story/2026/04/why-are-communities-pushing-back-against-data-centers/"},
{d:"Apr 4, 2026",dm:"Cable",t:"Medusa Africa cable: 480 Tbps across 24 fiber pairs — designed to deliver 20 Tbps per pair",s:"Shore Africa",u:"https://shore.africa/2026/04/06/equatorial-guinea-subsea-cable-medusa-internet/"},
{d:"Apr 4, 2026",dm:"Finance",t:"South Central US states: $43.3B in trailing 12-month DC starts — Midwest $31.2B, Southeast $28B",s:"ConstructConnect",u:"https://news.constructconnect.com/april-2026-data-center-report-extraordinary-growth-continues"},
// ─── APR 3 ───
{d:"Apr 3, 2026",dm:"Compute",t:"CBRE: Asia-Pacific data centre boom to continue in 2026 — Malaysia, India, Japan lead",s:"CBRE",u:"https://www.cbre.com/insights/articles/asia-pacific-data-centre-boom-to-continue-in-2026"},
{d:"Apr 2, 2026",dm:"Cable",t:"From Barrels to Bandwidth: A new chokepoint emerges in the Red Sea — 18% of world data at risk",s:"Better World Campaign",u:"https://betterworldcampaign.org/peace-and-security/from-barrels-to-bandwidth-a-new-chokepoint-emerges-in-the-red-sea"},
{d:"Apr 1, 2026",dm:"Compute",t:"Cyberjaya data center boom 2026: industrial land demand surges as hyperscale builds accelerate",s:"FactoryHub",u:"https://www.factoryhub.my/en/blog/cyberjaya-data-center-boom-industrial-land-warehouse-demand-2026"},
// ─── MAR 2026 ───
{d:"Mar 27, 2026",dm:"Compute",t:"Africa DC market 2026: structural growth, energy constraints, long-term investment strategy",s:"Zawya",u:"https://www.zawya.com/en/economy/africa/africa-data-centre-market-2026-structural-growth-energy-constraints-and-long-term-investment-strategy-rgzpkiik"},
{d:"Mar 25, 2026",dm:"Finance",t:"South Africa DC market: $2.55B (2025) → $5.28B by 2031 at 12.9% CAGR. Teraco, Vantage, ADC lead.",s:"GlobeNewswire",u:"https://www.globenewswire.com/news-release/2026/03/11/3253598/28124/en/South-Africa-Data-Center-Market-Investment-Growth-aNALYSIS-Report-2026-2031-Featuring-Key-DC-Investors-Africa-Data-Centres-Digital-Parks-Equinix-Microsoft-NTT-Open-Access-Teraco-Va.html"},
{d:"Mar 22, 2026",dm:"Compute",t:"Malaysia data centre tenders 2026: Gamuda RM2.14B + IJM RM873.9M hyperscale contracts awarded",s:"TendersGo",u:"https://www.tendersgo.com/post/malaysia-data-centre-boom-tenders-2026-track-hyperscale-rfps-0583"},
{d:"Mar 18, 2026",dm:"Semiconductor",t:"CRS: U.S. export controls and China — comprehensive overview of semiconductor restrictions",s:"Congress.gov",u:"https://www.congress.gov/crs-product/R48642"},
{d:"Mar 15, 2026",dm:"Compute",t:"6 data center market trends for 2025-2026: AI racks pushing 40-130 kW, 100 GW new capacity by 2030",s:"Brightlio",u:"https://brightlio.com/data-center-market-trends/"},
{d:"Mar 12, 2026",dm:"Compute",t:"Africa data center market: $1.94B (2025) → $4.36B by 2031 at 14.46% CAGR — Mordor Intelligence",s:"Mordor Intelligence",u:"https://www.mordorintelligence.com/industry-reports/africa-data-center-market"},
{d:"Mar 8, 2026",dm:"Cable",t:"PEACE cable cut in Red Sea 1,450 km from Egypt — HMN Tech repaired in 3 weeks vs months for others",s:"DCD",u:"https://www.datacenterdynamics.com/en/news/peace-subsea-cable-cut-in-the-red-sea-repair-to-take-months/"},
{d:"Mar 5, 2026",dm:"Regulation",t:"NVIDIA Supermicro launch 7 AI data platform solutions — GPU-dense infrastructure scaling globally",s:"Brightlio",u:"https://brightlio.com/data-center-market-trends/"},
{d:"Mar 2, 2026",dm:"Finance",t:"Raxio IFC $100M deal wins IJGlobal Digital Infrastructure Deal of Year — Africa",s:"IJGlobal",u:"https://ijglobal.com"},
// ─── FEB 2026 ───
{d:"Feb 28, 2026",dm:"Compute",t:"Africa's data center push faces power & connectivity bottlenecks despite $6.8B market growth",s:"Morocco World News",u:"https://www.moroccoworldnews.com/2026/01/275244/africas-data-center-push-faces-power-and-connectivity-bottlenecks-despite-6-8b-market-growth/"},
{d:"Feb 25, 2026",dm:"Compute",t:"Malaysia hyperscale DC market: $6.03B (2025) → $40.16B by 2031 at 37.15% CAGR",s:"Mordor Intelligence",u:"https://www.mordorintelligence.com/industry-reports/malaysia-hyperscale-data-center-market"},
{d:"Feb 22, 2026",dm:"Cable",t:"Red Sea cable cuts: hidden crisis threatening global internet infrastructure — 17 African countries affected",s:"Breached",u:"https://breached.company/red-sea-cable-cuts-the-hidden-crisis-threatening-global-internet-infrastructure/"},
{d:"Feb 18, 2026",dm:"Semiconductor",t:"Trump's illegal AI chip export controls: ECRA prohibits BIS from charging fees on export licenses",s:"Lawfare",u:"https://www.lawfaremedia.org/article/trump-s-illegal-ai-chip-export-controls--and-who-can-challenge-them"},
{d:"Feb 14, 2026",dm:"Power",t:"Data centers could be the spark Africa's power sector needs — AEC 2026 Outlook Report",s:"African Energy Chamber",u:"https://energychamber.org/data-centers-could-be-the-spark-africas-power-sector-needs/"},
{d:"Feb 10, 2026",dm:"Finance",t:"Asia as the hub of the data center boom — 2025 in review: multibillion-dollar investments flood APAC",s:"Light Reading",u:"https://www.lightreading.com/data-centers/2025-in-review-asia-emerges-as-the-hub-of-the-data-center-boom"},
{d:"Feb 6, 2026",dm:"Compute",t:"Malaysia's data center boom: inside look at Asia's battle for AI supremacy — Johor 900 MW in 3 years",s:"KrAsia",u:"https://kr-asia.com/malaysias-data-center-boom-an-inside-look-at-asias-battle-for-ai-supremacy"},
{d:"Feb 2, 2026",dm:"Regulation",t:"ITIF: 144 data localization measures across 62 countries — doubled since 2017",s:"ITIF",u:"https://itif.org/publications/2024/02/12/how-much-will-gdpr-style-data-localization-spread/"},
// ─── JAN 2026 ───
{d:"Jan 28, 2026",dm:"Compute",t:"Inside the race to fire up Africa's power-hungry data centres — Raxio, BII, MSFT/G42 examined",s:"African Business",u:"https://african.business/2025/12/technology-information/inside-the-race-to-fire-up-africas-power-hungry-data-centres"},
{d:"Jan 24, 2026",dm:"Finance",t:"Malaysia DC market: $6.14B (2025) → $11.40B by 2031 — Cyberjaya emerges as leading hub",s:"Yahoo Finance",u:"https://finance.yahoo.com/news/malaysia-data-center-market-investment-125400641.html"},
{d:"Jan 20, 2026",dm:"Semiconductor",t:"Trump lifts AI chip ban on China — Nvidia H200 + AMD MI325X cleared for case-by-case export",s:"Built In",u:"https://builtin.com/articles/trump-lifts-ai-chip-ban-china-nvidia"},
{d:"Jan 16, 2026",dm:"Semiconductor",t:"BIS revises license review policy: H200 exports to China at 25% revenue share — case-by-case basis",s:"BIS.gov",u:"https://www.bis.gov/press-release/department-commerce-revises-license-review-policy-semiconductors-exported-china"},
{d:"Jan 13, 2026",dm:"Semiconductor",t:"Trump: 25% tariff on advanced AI semiconductors via Section 232 — H200, MI325X covered",s:"Lawfare",u:"https://www.lawfaremedia.org/article/trump-s-illegal-ai-chip-export-controls--and-who-can-challenge-them"},
{d:"Jan 8, 2026",dm:"Compute",t:"Africa data center market: $7.39B (2024) → $12.40B by 2030 — Next Move Strategy Consulting",s:"NextMSC",u:"https://www.nextmsc.com/report/africa-data-center-market"},
{d:"Jan 4, 2026",dm:"Cable",t:"PEACE cable system cut in Red Sea — 1,450 km from Egypt, repair expected months",s:"Submarine Networks",u:"https://www.submarinenetworks.com/en/systems/asia-europe-africa/peace/peace-cable-cut-in-the-red-sea,-repair-to-be-prolonged"},
// ─── DEC 2025 ───
{d:"Dec 29, 2025",dm:"Compute",t:"223 data centers across 38 African countries — SA 56, KE 19, NG 17. AEC 2026 Outlook.",s:"African Energy Chamber",u:"https://energychamber.org/data-centers-could-be-the-spark-africas-power-sector-needs/"},
{d:"Dec 25, 2025",dm:"Semiconductor",t:"BIS: H200 export to China at 25% revenue share — AMD MI325X included. AI Overwatch Act introduced.",s:"BIS.gov",u:"https://www.bis.gov/news-updates"},
{d:"Dec 20, 2025",dm:"Finance",t:"Africa data center construction market: $1.26B (2024) → $3.06B by 2030 at 15.94% CAGR",s:"TechAfrica News",u:"https://techafricanews.com/2025/04/25/africas-data-center-market-to-triple-by-2030-hitting-3-06b/"},
{d:"Dec 15, 2025",dm:"Compute",t:"Africa colocation: 120+ existing DCs — Morocco dominates upcoming pipeline with 50%+ of power capacity",s:"BusinessWire",u:"https://www.businesswire.com/news/home/20251205629276/en/Africa-Colocation-Existing-Upcoming-Data-Center-Portfolio-Analysis-Report-2025-Expansion-Driven-by-Strong-Growth-in-Nigeria-Kenya-Egypt-South-Africa---ResearchAndMarkets.com"},
{d:"Dec 10, 2025",dm:"Regulation",t:"Navigating GPU export controls in data center operations — Greenberg Traurig advisory",s:"Greenberg Traurig",u:"https://www.gtlaw.com/en/insights/2025/12/navigating-gpu-export-controls-and-ai-use-restrictions-in-data-center-operations"},
{d:"Dec 5, 2025",dm:"Compute",t:"McKinsey: African DC capacity to reach 1.5–2.2 GW by 2030. $10–20B new capital required.",s:"Africa DCA",u:"https://africadca.org/en/building-data-centers-for-africas-unique-market-dynamics"},
{d:"Dec 1, 2025",dm:"Power",t:"Teraco begins 120 MW solar PV construction in Free State, South Africa — supply to DCs by 2026",s:"TechAfrica News",u:"https://techafricanews.com/2025/04/25/africas-data-center-market-to-triple-by-2030-hitting-3-06b/"},
// ─── NOV 2025 ───
{d:"Nov 28, 2025",dm:"Semiconductor",t:"Sidley Austin: new US export controls on advanced computing items and AI model weights — 7 key takeaways",s:"Sidley Austin",u:"https://www.sidley.com/en/insights/newsupdates/2025/01/new-us-export-controls-on-advanced-computing-items-and-artificial-intelligence-model-weights"},
{d:"Nov 24, 2025",dm:"Compute",t:"Malaysia, Indonesia, India emerge as leading DC growth markets — 9.7% YoY capacity growth forecast",s:"TechNode Global",u:"https://technode.global/2025/11/17/malaysia-indonesia-and-india-emerge-as-leading-growth-markets-in-data-center-bmi/"},
{d:"Nov 18, 2025",dm:"Compute",t:"Microsoft $2.2B Malaysia cloud region. AWS $6B. Google $2B. NTT Johor campus announced.",s:"Yahoo Finance",u:"https://finance.yahoo.com/news/malaysia-data-center-market-investment-125400641.html"},
{d:"Nov 12, 2025",dm:"Finance",t:"iXAfrica secures $200M debt funding for Nairobi DC expansion — largest in East Africa",s:"Kenyan Wall Street",u:"https://www.kenyawallstreet.com/ixafrica-secures-200m-debt-facility/"},
{d:"Nov 6, 2025",dm:"Cable",t:"Insikt Group: 44 cable damage events across 32 locations in 2024–mid 2025. ~30% unknown cause.",s:"Gulf News",u:"https://gulfnews.com/technology/red-sea-cable-chaos-why-the-internet-didnt-go-dark-1.500263896"},
{d:"Nov 2, 2025",dm:"Power",t:"Africa 350 GW unexploited hydropower — continent's most underutilised asset. $0.02–0.04/kWh.",s:"IEA",u:"https://www.iea.org/reports/africa-energy-outlook-2022"},
// ─── OCT 2025 ───
{d:"Oct 28, 2025",dm:"Semiconductor",t:"Huawei Mate 70 with domestic Kirin 9100 chip — SMIC 7nm process confirmed despite US controls",s:"Built In",u:"https://builtin.com/articles/trump-lifts-ai-chip-ban-china-nvidia"},
{d:"Oct 22, 2025",dm:"Compute",t:"SA DC portfolio: 55 existing DCs, 355 MW, $2B+ investment by 2026. Teraco JB7 under construction.",s:"GlobeNewswire",u:"https://www.globenewswire.com/news-release/2026/03/11/3253598/28124/en/South-Africa-Data-Center-Market-Investment-Growth-aNALYSIS-Report-2026-2031-Featuring-Key-DC-Investors-Africa-Data-Centres-Digital-Parks-Equinix-Microsoft-NTT-Open-Access-Teraco-Va.html"},
{d:"Oct 16, 2025",dm:"Cable",t:"TeleGeography: 77 cable systems now connected to Africa — up from ~60 in 2022",s:"Submarine Networks",u:"https://www.submarinenetworks.com/en/systems/asia-europe-africa/peace/peace-cable-cut-in-the-red-sea,-repair-to-be-prolonged"},
{d:"Oct 10, 2025",dm:"Regulation",t:"BIS: 50 percent rule adopted for export controls — semiconductor manufacturing items tightened",s:"Sidley Austin",u:"https://www.sidley.com/en/insights/newsupdates/2025/01/new-us-export-controls-on-advanced-computing-items-and-artificial-intelligence-model-weights"},
{d:"Oct 5, 2025",dm:"Finance",t:"Vantage-Attacq JV: 80 MW / $34M Joburg DC campus announced — construction begins",s:"GlobeNewswire",u:"https://www.globenewswire.com/news-release/2026/03/11/3253598/28124/en/South-Africa-Data-Center-Market-Investment-Growth-aNALYSIS-Report-2026-2031-Featuring-Key-DC-Investors-Africa-Data-Centres-Digital-Parks-Equinix-Microsoft-NTT-Open-Access-Teraco-Va.html"},
// ─── SEP 2025 ───
{d:"Sep 10, 2025",dm:"Cable",t:"Red Sea cable chaos: why the Internet didn't go dark — SMW4, IMEWE, FALCON cut near Jeddah",s:"Gulf News",u:"https://gulfnews.com/technology/red-sea-cable-chaos-why-the-internet-didnt-go-dark-1.500263896"},
{d:"Sep 8, 2025",dm:"Cable",t:"Multiple submarine cables severed near Jeddah — Azure latency spikes, UAE/India/Pakistan degraded",s:"Euronews",u:"https://www.euronews.com/next/2025/09/08/what-do-we-know-about-internet-disruptions-from-cut-subsea-cables-in-the-red-sea"},
{d:"Sep 7, 2025",dm:"Cable",t:"Microsoft restores Azure via rerouting — warns Red Sea cable repair 'weeks or months'",s:"ThousandEyes",u:"https://www.thousandeyes.com/blog/internet-report-red-sea-subsea-cable-cuts"},
{d:"Sep 6, 2025",dm:"Cable",t:"International cable breaks in Red Sea cause latency surge across Asia and Gulf — NetBlocks confirms",s:"Subsea Cables",u:"https://www.subseacables.net/submarine-cables-updates/international-cable-breaks-in-red-sea-cause-latency-surge-across-asia-and-gulf/"},
{d:"Sep 4, 2025",dm:"Semiconductor",t:"BIS removes Samsung/SK Hynix PRC facilities from VEU program — effective Dec 31, 2025",s:"Congress.gov",u:"https://www.congress.gov/crs-product/R48642"},
{d:"Sep 2, 2025",dm:"Power",t:"GERD inaugurated: 5.15 GW operational — Africa's largest hydropower. $0.02–0.04/kWh.",s:"African Energy Chamber",u:"https://energychamber.org/data-centers-could-be-the-spark-africas-power-sector-needs/"},
// ─── AUG 2025 ───
{d:"Aug 28, 2025",dm:"Semiconductor",t:"Trump announces H20 chip export to China at 15% revenue share — unprecedented revenue-for-access model",s:"Built In",u:"https://builtin.com/articles/trump-lifts-ai-chip-ban-china-nvidia"},
{d:"Aug 22, 2025",dm:"Compute",t:"Malaysia hyperscale data center market: Johor pipeline hits 900+ MW in 3 years. $14.7B committed.",s:"KrAsia",u:"https://kr-asia.com/malaysias-data-center-boom-an-inside-look-at-asias-battle-for-ai-supremacy"},
{d:"Aug 16, 2025",dm:"Regulation",t:"CSIS: understanding US allies' legal authority to implement AI and semiconductor export controls",s:"CSIS",u:"https://www.csis.org/analysis/understanding-us-allies-current-legal-authority-implement-ai-and-semiconductor-export"},
{d:"Aug 10, 2025",dm:"Finance",t:"India DC capacity hits 1.52 GW — 387 MW added in 2025. AdaniConneX 400 MW. $14.7B invested 2020-2025.",s:"CBRE",u:"https://www.cbre.com/insights/articles/asia-pacific-data-centre-boom-to-continue-in-2026"},
{d:"Aug 5, 2025",dm:"Cable",t:"How did we survive the Red Sea fiber optic cable disaster — global repair capacity under strain",s:"IPTP Networks",u:"https://www.iptp.net/blog/how-did-we-survive-the-red-sea-fiber-optic-cable-disaster/"},
{d:"Aug 1, 2025",dm:"Compute",t:"NVIDIA $700M partnership with Cassava Technologies — AI-ready DCs across Egypt, Nigeria, Kenya, Morocco",s:"GlobeNewswire",u:"https://www.globenewswire.com/news-release/2026/03/11/3253598/28124/en/South-Africa-Data-Center-Market-Investment-Growth-aNALYSIS-Report-2026-2031-Featuring-Key-DC-Investors-Africa-Data-Centres-Digital-Parks-Equinix-Microsoft-NTT-Open-Access-Teraco-Va.html"},
// ─── JUL 2025 ───
{d:"Jul 28, 2025",dm:"Power",t:"Malaysia implements power tariffs for DCs — 10-14% cost increase. Ultra-high voltage classification.",s:"Yahoo Finance",u:"https://finance.yahoo.com/news/malaysia-data-center-market-investment-125400641.html"},
{d:"Jul 22, 2025",dm:"Semiconductor",t:"Trump AI Action Plan issued — export control replacement framework signaled. BIS rescinds Biden rule.",s:"BIS.gov",u:"https://www.bis.gov/news-updates"},
{d:"Jul 16, 2025",dm:"Finance",t:"Raxio Angola largest DC in country — $30M expansion opened. IFC $100M platform backing.",s:"Africa DCA",u:"https://africadca.org/en/building-data-centers-for-africas-unique-market-dynamics"},
{d:"Jul 10, 2025",dm:"Semiconductor",t:"Cadence Design pleads guilty — $213M penalty for selling EDA tools to China's NUDT",s:"Congress.gov",u:"https://www.congress.gov/crs-product/R48642"},
{d:"Jul 5, 2025",dm:"Compute",t:"Vantage KUL14 launches at Cyberjaya campus — 16 MW facility fully leased before completion",s:"FactoryHub",u:"https://www.factoryhub.my/en/blog/cyberjaya-data-center-boom-industrial-land-warehouse-demand-2026"},
// ─── JUN 2025 ─
{d:"Jun 20, 2025",dm:"Regulation",t:"SemiAnalysis: AI Diffusion Rule analysis — Microsoft regulatory capture, per-country GPU quotas",s:"SemiAnalysis",u:"https://newsletter.semianalysis.com/p/2025-ai-diffusion-export-controls-microsoft-regulatory-capture-oracle-tears"},
{d:"Jun 12, 2025",dm:"Cable",t:"Red Sea fiber optic cable vulnerability: 99% of international internet traffic flows through submarine cables",s:"IPTP Networks",u:"https://www.iptp.net/blog/how-did-we-survive-the-red-sea-fiber-optic-cable-disaster/"},
{d:"Jun 5, 2025",dm:"Compute",t:"ITU Submarine Cable Resilience Summit in Abuja, Nigeria — Declaration adopted for cooperative resilience",s:"Submarine Networks",u:"https://www.submarinenetworks.com/en/systems/asia-europe-africa/peace/peace-cable-cut-in-the-red-sea,-repair-to-be-prolonged"},
// ─── MAY 2025 ───
{d:"May 28, 2025",dm:"Semiconductor",t:"BIS assesses Huawei Ascend chips developed in violation of US export controls — warns users",s:"Congress.gov",u:"https://www.congress.gov/crs-product/R48642"},
{d:"May 22, 2025",dm:"Regulation",t:"Trump rescinds Biden AI Diffusion Rule — replacement pending. 3-tier country framework removed.",s:"BIS.gov",u:"https://www.bis.gov/news-updates"},
{d:"May 15, 2025",dm:"Regulation",t:"Holland & Knight: US strengthens export controls on advanced computing items, semiconductor manufacturing",s:"Holland & Knight",u:"https://www.hklaw.com/en/insights/publications/2024/12/us-strengthens-export-controls-on-advanced-computing-items"},
];

const FEED_DM_COLORS={Conflict:"rgba(255,100,100,0.55)",Cable:"rgba(100,180,255,0.55)",Semiconductor:"rgba(200,150,255,0.55)",Compute:"rgba(100,220,180,0.55)",Finance:"rgba(255,210,100,0.55)",Power:"rgba(255,170,60,0.55)",Regulation:"rgba(180,180,180,0.45)"};

// ─── WATCHTOWER CONTAINER ───
function WatchtowerView(){
  const[activeDm,setActiveDm]=useState("All");
  const[visCount,setVisCount]=useState(30);
  const filtered=activeDm==="All"?LIVE_SIGNALS:LIVE_SIGNALS.filter(s=>s.dm===activeDm);
  const visible=filtered.slice(0,visCount);
  return (
    <div className="ti-wt-wrap" style={{paddingTop:80,maxWidth:960,margin:"0 auto",padding:"80px 36px 50px"}}>
      <div style={{fontFamily:"'SF Mono',monospace",fontSize:9,color:"rgba(255,255,255,0.2)",letterSpacing:"0.14em",marginBottom:4}}>WATCHTOWER</div>
      <h2 style={{fontFamily:"'Instrument Serif',Georgia,serif",fontSize:28,fontWeight:400,color:"#fff",margin:"0 0 6px"}}>Signal Feed</h2>
      <p style={{fontFamily:"'Inter',sans-serif",fontSize:10,color:"rgba(255,255,255,0.25)",marginBottom:20,lineHeight:1.6}}>
        External intelligence across compute, cable, semiconductor, power, regulation, finance, and conflict domains. Each signal links to its original source.
      </p>
      {/* Domain filters */}
      <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:16}}>
        {["All",...Object.keys(FEED_DM_COLORS)].map(d=>{const col=FEED_DM_COLORS[d];const active=activeDm===d;return(
          <button key={d} onClick={()=>{setActiveDm(d);setVisCount(30);}}
            style={{fontFamily:"'SF Mono',monospace",fontSize:7,letterSpacing:"0.06em",cursor:"pointer",transition:"all 0.15s",fontWeight:active?600:400,
              color:active?(d==="All"?"#fff":"#000"):col||"rgba(255,255,255,0.3)",
              background:active?(d==="All"?"rgba(255,255,255,0.12)":col||"rgba(255,255,255,0.08)"):"transparent",
              border:`1px solid ${active?(col||"rgba(255,255,255,0.2)"):(col?.replace("0.55","0.18")||"rgba(255,255,255,0.08)")}`,
              padding:"4px 9px",borderRadius:3}}>{d.toUpperCase()}</button>);
        })}
      </div>
      <div style={{fontFamily:"'Inter',sans-serif",fontSize:9,color:"rgba(255,255,255,0.15)",marginBottom:12}}>{filtered.length} signals{activeDm!=="All"&&<button onClick={()=>setActiveDm("All")} style={{marginLeft:8,fontFamily:"'SF Mono',monospace",fontSize:7,color:"rgba(255,255,255,0.25)",background:"transparent",border:"none",cursor:"pointer",textDecoration:"underline"}}>clear</button>}</div>
      {/* Signal rows */}
      {visible.map((s,i)=>{const col=FEED_DM_COLORS[s.dm]||"rgba(200,200,200,0.4)";return(
        <a key={i} href={s.u} target="_blank" rel="noopener noreferrer"
          style={{display:"flex",alignItems:"flex-start",gap:10,padding:"10px 14px",marginBottom:2,
            border:"1px solid rgba(255,255,255,0.04)",borderRadius:6,textDecoration:"none",color:"#fff",
            transition:"all 0.15s"}}
          onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.03)";e.currentTarget.style.borderColor="rgba(255,255,255,0.08)";}}
          onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.borderColor="rgba(255,255,255,0.04)";}}>
          <div style={{flex:1,minWidth:0}}>
            <div style={{display:"flex",gap:4,marginBottom:3,flexWrap:"wrap",alignItems:"center"}}>
              <span style={{fontFamily:"'SF Mono',monospace",fontSize:7,color:col,background:"rgba(255,255,255,0.03)",border:`1px solid ${col.replace("0.55","0.15").replace("0.45","0.12")}`,padding:"1px 5px",borderRadius:2,letterSpacing:"0.06em"}}>{s.dm.toUpperCase()}</span>
              <span style={{fontFamily:"'SF Mono',monospace",fontSize:7,color:"rgba(255,255,255,0.2)"}}>{s.s}</span>
              <span style={{fontFamily:"'SF Mono',monospace",fontSize:7,color:"rgba(255,255,255,0.12)"}}>{s.d}</span>
            </div>
            <div style={{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:500,lineHeight:1.3,color:"rgba(255,255,255,0.85)"}}>{s.t}</div>
          </div>
          <span style={{fontFamily:"'SF Mono',monospace",fontSize:8,color:"rgba(100,180,255,0.5)",flexShrink:0,marginTop:8}}>↗</span>
        </a>);
      })}
      {visCount<filtered.length&&<button onClick={()=>setVisCount(v=>v+30)}
        style={{width:"100%",marginTop:8,padding:"14px",fontFamily:"'SF Mono',monospace",fontSize:8,letterSpacing:"0.1em",
          color:"rgba(255,255,255,0.3)",background:"transparent",border:"1px solid rgba(255,255,255,0.06)",
          borderRadius:5,cursor:"pointer"}}
        onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.03)"}
        onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
        LOAD MORE · {filtered.length-visCount} remaining
      </button>}
      {visCount>=filtered.length&&filtered.length>0&&<div style={{padding:"24px 0",textAlign:"center",fontFamily:"'SF Mono',monospace",fontSize:7,color:"rgba(255,255,255,0.08)",letterSpacing:"0.12em"}}>END OF FEED · {filtered.length} SIGNALS</div>}
    </div>
  );
}


// ─── METHODOLOGY ───
function MethodologyView(){
  const sections=[
    {k:"PURPOSE",t:"What This Platform Is",body:"Tatari Institute is a sovereign compute intelligence platform — a structured attempt to apply rigorous epistemic discipline to the question of where AI infrastructure will be built, why, and at what risk. It sits between a think tank and an intelligence platform: grounded in verifiable data, explicit about uncertainty, and designed for decision-makers with capital at stake in global digital infrastructure."},
    {k:"SCOPE",t:"Coverage Universe",body:"181 countries classified into 8 compute-relevance buckets. 30 countries deep-tracked with full intelligence cards. 5 scoring dimensions per country: CSI (Compute Supply Infrastructure), P2C (Power-to-Compute), LPS (Localization Pressure Score), CCR (Cable & Connectivity Risk), OVR (Overall). Live RSS feed spanning ~10 authoritative sources. Historical signal archive from Sep 2025 → present."},
    {k:"BUCKETS",t:"The 8-Bucket Classification System",body:"Countries are assigned to one of 8 compute-relevance buckets based on their infrastructure maturity, power availability, regulatory environment, and capital flow signals. Bucket 1 (Core Hyperscale) through Bucket 8 (Irrelevant/Excluded). Bucket assignments are analyst judgments, not algorithmic outputs. They are revised when material evidence warrants — not on a fixed schedule."},
    {k:"SCORING",t:"The 5-Dimension Scoring Framework",body:"CSI: Compute Supply Infrastructure — existing DC capacity, operator quality, power reliability, connectivity density. P2C: Power-to-Compute — surplus power available for co-location, renewable fraction, cost/kWh, transmission adequacy. LPS: Localization Pressure Score — strength and enforcement trajectory of data residency mandates. Higher = more demand signal. CCR: Cable & Connectivity Risk — exposure to submarine cable disruption, repair capacity lag, single points of failure. Lower = riskier. OVR: Overall — analyst composite of all dimensions. All scores are 0–100. All represent analyst assessments, not model outputs."},
    {k:"EPISTEMIC",t:"Epistemic Framework",body:"Every claim in Tatari's research carries one of four epistemic tags: FACT (verified primary source — government filing, official press release, peer-reviewed data), EST (estimate with stated basis and confidence interval), INFERENCE (analyst judgment derived from available evidence — explicitly labeled as such), PARTIAL (claim that is partially sourced; remaining element unverified). This tagging system exists because conflating estimates with facts, or inference with verified data, is how intelligence products mislead. The distinction is load-bearing."},
    {k:"CONFIDENCE",t:"Confidence & Provenance",body:"Sources are categorized as: Primary (direct issuer — IFC press release, government gazette, company filing), Secondary (credible third-party reporting — Reuters, DCD, African Business, IFC press coverage), Internal (Tatari analyst assessment), Reported Claim (claim made by a named party, accuracy unverified). Each source entry carries a confidence rating (high / medium / low) and a verification status (verified / partial / unverified). Where provenance is unavailable, this is flagged explicitly rather than omitted silently."},
    {k:"WATCHTOWER",t:"Signal Classification",body:"Watchtower signals are tagged A (Critical — verified primary or highly credible secondary, high confidence) or B (Verified — credible secondary, moderate confidence). The TATARI INFERENCE field in each signal is analyst judgment — not reported fact. The SIGNAL IMPACT field uses score notation (e.g. CSI ↑ KE) referencing the scoring framework. Live feed signals are pulled directly from RSS sources and linked to their original articles. They are not vetted by analysts before appearing — the live feed is a news aggregation layer, not a curated intelligence assessment."},
    {k:"TRACKERS",t:"External Tracker Integration",body:"Tatari uses external tracking systems as structured evidence inputs into its scoring and analytical framework. Source families include TeleGeography (submarine cable topology), Digital Policy Alert (regulatory change monitoring), Interconnection.fyi (U.S. grid queue data), Steptoe Data Center Regulation Tracker (state-level DC proceedings), IEA (structural power baselines), and DLA Piper (jurisdictional legal baselines). These are not Tatari-owned data — they are third-party monitoring systems whose outputs Tatari interprets through its own epistemic framework. The globe's analytical lenses visualize how different evidence systems reinterpret the same geography. Each lens ties to one or more Tatari score dimensions and is updated on a rolling 8-month cycle."},
    {k:"LIMITATIONS",t:"Known Limitations",body:"Scores are backward-looking by construction — they reflect conditions as of the last update date shown on each card. Emerging markets with thin public data (DRC, Ethiopia, Angola) carry higher estimation uncertainty than mature markets. The globe visualization shows all 181 classified countries but bucket assignments for non-tracked countries are coarser approximations. Market size figures cite third-party research firms (Mordor Intelligence, Arizton, ResearchAndMarkets) whose methodologies differ — treat ranges rather than point estimates."},
    {k:"UPDATES",t:"Update Cadence",body:"Deep-tracked country cards: quarterly or event-driven (major financing, conflict event, regulatory change). Watchtower signals: continuous via live RSS feed + analyst-curated historical archive. Bucket classifications: reviewed semi-annually. Score adjustments: event-driven, flagged with update date."},
  ];
  return (
    <div className="ti-meth-wrap" style={{paddingTop:80,maxWidth:760,margin:"0 auto",padding:"80px 36px 60px"}}>
      <div style={{fontFamily:"'SF Mono',monospace",fontSize:9,color:"rgba(255,255,255,0.2)",letterSpacing:"0.14em",marginBottom:4}}>METHODOLOGY</div>
      <h2 style={{fontFamily:"'Instrument Serif',Georgia,serif",fontSize:28,fontWeight:400,color:"#fff",margin:"0 0 6px"}}>Epistemic Framework</h2>
      <p style={{fontFamily:"'Inter',sans-serif",fontSize:11,color:"rgba(255,255,255,0.3)",marginBottom:32,lineHeight:1.6}}>
        How Tatari Institute classifies, scores, and sources its intelligence. Confidence is declared, not implied.
      </p>
      {sections.map(s=>(
        <div key={s.k} style={{marginBottom:0,borderTop:"1px solid rgba(255,255,255,0.04)",paddingTop:24,paddingBottom:24}}>
          <div style={{display:"flex",gap:16,alignItems:"flex-start"}}>
            <div style={{fontFamily:"'SF Mono',monospace",fontSize:8,color:"rgba(255,255,255,0.2)",letterSpacing:"0.1em",minWidth:90,paddingTop:3,flexShrink:0}}>{s.k}</div>
            <div style={{flex:1}}>
              <div style={{fontFamily:"'Instrument Serif',Georgia,serif",fontSize:16,fontWeight:400,color:"rgba(255,255,255,0.85)",marginBottom:8}}>{s.t}</div>
              <p style={{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:300,color:"rgba(255,255,255,0.4)",lineHeight:1.7,margin:0}}>{s.body}</p>
            </div>
          </div>
        </div>
      ))}
      <div style={{marginTop:8,padding:"16px 20px",background:"rgba(255,255,255,0.01)",border:"1px solid rgba(255,255,255,0.05)",borderRadius:6}}>
        <div style={{fontFamily:"'SF Mono',monospace",fontSize:7,color:"rgba(255,255,255,0.2)",marginBottom:6,letterSpacing:"0.1em"}}>CONTACT</div>
        <p style={{fontFamily:"'Inter',sans-serif",fontSize:10,color:"rgba(255,255,255,0.3)",lineHeight:1.6,margin:0}}>
          To flag a data error, propose a correction, or request a methodology briefing: <span style={{color:"rgba(100,180,255,0.6)"}}>research@tatari.institute</span>
        </p>
      </div>
    </div>
  );
}

// ─── PODCAST ───
const PODCAST_EPISODES=[
  {num:"03",guest:"Philip Larrey",role:"Dean of Philosophy, Pontifical Lateran University",date:"Apr 2026",duration:"42 min",
    desc:"Philip Larrey joins the Tatari Podcast to explore the ethics of artificial intelligence, the philosophical foundations of machine decision-making, and what happens when compute infrastructure becomes a tool of geopolitical power. A conversation about technology, morality, and the institutions that should govern both.",
    tags:["AI ETHICS","PHILOSOPHY","GOVERNANCE","TECHNOLOGY"],
    spotifyUrl:"https://open.spotify.com/episode/258oApUxjls6TtrSyeCZdv",latest:true},
  {num:"02",guest:"Lawrence Lessig",role:"Roy L. Furman Professor of Law, Harvard Law School",date:"Apr 2026",duration:"38 min",
    desc:"Lawrence Lessig joins the Tatari Podcast to discuss how digital architecture shapes freedom, why the original internet's core protections eroded, and what it would take to build AI systems that actually serve public values. From 'code is law' to institutional corruption — a conversation with a former Presidential candidate about power, incentives, and the future of democracy in a machine-driven age.",
    tags:["GOVERNANCE","AI POLICY","DIGITAL ARCHITECTURE","DEMOCRACY"],
    spotifyUrl:"https://open.spotify.com/episode/3BLtDsxCvPMTUIWaiywwyy",latest:false},
  {num:"01",guest:"Kevin Powers",role:"Faculty Director, MLS Cybersecurity \u00b7 Boston College Law School",date:"Mar 2026",duration:"45 min",
    desc:"Kevin Powers is the Faculty Director and Lecturer-in-Law for the Master of Legal Studies in Cybersecurity, Risk & Governance at Boston College Law School. A Cybersecurity Research Affiliate at MIT Sloan and former Deputy General Counsel at the U.S. Naval Academy, Powers brings deep institutional and legal perspective to the intersection of cybersecurity policy and digital infrastructure governance.",
    tags:["CYBERSECURITY","GOVERNANCE","LEGAL","INFRASTRUCTURE"],
    spotifyUrl:"https://open.spotify.com/episode/2q9g4GWlX4clqM2cgKnCWY",latest:false},
];

function PodcastView(){
  return (
    <div className="ti-research-wrap" style={{paddingTop:80,maxWidth:760,margin:"0 auto",padding:"80px 36px 60px"}}>
      <div style={{fontFamily:"'SF Mono',monospace",fontSize:9,color:"rgba(255,255,255,0.2)",letterSpacing:"0.14em",marginBottom:4}}>THE TATARI PODCAST</div>
      <h2 style={{fontFamily:"'Instrument Serif',Georgia,serif",fontSize:28,fontWeight:400,color:"#fff",margin:"0 0 6px"}}>Episodes</h2>
      <p style={{fontFamily:"'Inter',sans-serif",fontSize:11,color:"rgba(255,255,255,0.35)",marginBottom:16,lineHeight:1.6}}>
        The infrastructure behind the AI economy. Conversations with engineers, researchers, investors, and policymakers on energy, compute, semiconductors, and the capital financing global data-center expansion.
      </p>
      <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:10}}>
        <a href="https://open.spotify.com/show/tatari-institute" target="_blank" rel="noopener noreferrer"
          style={{display:"inline-flex",alignItems:"center",gap:6,padding:"6px 14px",
            background:"rgba(30,215,96,0.12)",border:"1px solid rgba(30,215,96,0.25)",borderRadius:20,
            textDecoration:"none",cursor:"pointer"}}>
          <div style={{width:8,height:8,borderRadius:"50%",background:"#1ED760"}} />
          <span style={{fontFamily:"'SF Mono',monospace",fontSize:8,color:"#1ED760",letterSpacing:"0.08em",fontWeight:600}}>LISTEN ON SPOTIFY</span>
        </a>
        <span style={{fontFamily:"'SF Mono',monospace",fontSize:8,color:"rgba(255,255,255,0.15)"}}>{PODCAST_EPISODES.length} EPISODES</span>
      </div>
      <div style={{marginTop:24}}>
        {PODCAST_EPISODES.map(ep=>(
          <div key={ep.num} style={{padding:"24px 0",borderTop:"1px solid rgba(255,255,255,0.05)"}}>
            <div style={{display:"flex",gap:20,alignItems:"flex-start"}}>
              {/* Episode number column */}
              <div style={{flexShrink:0,width:40}}>
                <div style={{fontFamily:"'Instrument Serif',Georgia,serif",fontSize:28,fontWeight:400,color:"rgba(255,255,255,0.15)"}}>{ep.num}</div>
              </div>
              {/* Content */}
              <div style={{flex:1}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:8,marginBottom:4}}>
                  <div>
                    <h3 style={{fontFamily:"'Instrument Serif',Georgia,serif",fontSize:20,fontWeight:400,color:"#fff",margin:0,lineHeight:1.2}}>{ep.guest}</h3>
                    <div style={{fontFamily:"'Inter',sans-serif",fontSize:10,color:"rgba(255,255,255,0.3)",marginTop:3}}>{ep.role}</div>
                  </div>
                  <div style={{display:"flex",gap:6,alignItems:"center"}}>
                    {ep.latest&&<span style={{fontFamily:"'SF Mono',monospace",fontSize:7,color:"rgba(255,255,255,0.6)",background:"rgba(255,255,255,0.08)",padding:"2px 6px",borderRadius:3,letterSpacing:"0.06em"}}>LATEST</span>}
                    <span style={{fontFamily:"'SF Mono',monospace",fontSize:8,color:"rgba(255,255,255,0.2)"}}>{ep.date} · {ep.duration}</span>
                  </div>
                </div>
                <p style={{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:300,color:"rgba(255,255,255,0.4)",lineHeight:1.6,margin:"10px 0 12px"}}>{ep.desc}</p>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
                  <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
                    {ep.tags.map((t,i)=>(
                      <span key={i} style={{fontFamily:"'SF Mono',monospace",fontSize:7,color:"rgba(255,255,255,0.2)",background:"rgba(255,255,255,0.03)",padding:"2px 6px",borderRadius:2,border:"1px solid rgba(255,255,255,0.05)",letterSpacing:"0.06em"}}>{t}</span>
                    ))}
                  </div>
                  <a href={ep.spotifyUrl} target="_blank" rel="noopener noreferrer"
                    style={{display:"inline-flex",alignItems:"center",gap:5,padding:"5px 12px",
                      background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",
                      borderRadius:4,textDecoration:"none",cursor:"pointer",transition:"all 0.15s"}}
                    onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.08)";}}
                    onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.04)";}}>
                    <span style={{fontFamily:"'SF Mono',monospace",fontSize:8,color:"rgba(255,255,255,0.5)",letterSpacing:"0.06em"}}>PLAY</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* About the podcast */}
      <div style={{marginTop:24,padding:"16px 20px",background:"rgba(255,255,255,0.01)",border:"1px solid rgba(255,255,255,0.05)",borderRadius:6}}>
        <div style={{fontFamily:"'SF Mono',monospace",fontSize:7,color:"rgba(255,255,255,0.2)",marginBottom:6,letterSpacing:"0.1em"}}>ABOUT THE PODCAST</div>
        <p style={{fontFamily:"'Inter',sans-serif",fontSize:10,color:"rgba(255,255,255,0.3)",lineHeight:1.6,margin:0}}>
          Produced by the Tatari Institute. New episodes feature conversations with faculty from Boston College, Harvard, MIT, and practitioners across energy, compute infrastructure, and digital policy. To suggest a guest or topic, contact <a href="mailto:info@tatari.systems" style={{color:"rgba(100,180,255,0.6)",textDecoration:"none"}}>info@tatari.systems</a>.
        </p>
      </div>
    </div>
  );
}

// ─── CONTRIBUTE PAGE ───
function ContributeView(){
  const [form,setForm]=useState({name:"",email:"",affiliation:"",type:"research_note",title:"",abstract:"",body:""});
  const [status,setStatus]=useState("idle"); // idle | copied | opened
  const types=[
    {id:"research_note",label:"Research Note",desc:"800-2,000 words. Original analysis on compute infrastructure, energy systems, connectivity, or digital policy."},
    {id:"signal_submission",label:"Signal",desc:"Single verified development with source URL, epistemic tag, and brief Tatari-relevant inference."},
    {id:"data_correction",label:"Correction",desc:"Flag an error in country scores, project data, or signal attribution. Include source."},
    {id:"methodology_comment",label:"Methodology",desc:"Critique or proposed refinement to scoring, classification, or epistemic framework."},
    {id:"partnership_inquiry",label:"Partnership",desc:"For institutions, DFIs, operators, or researchers seeking structured collaboration."},
  ];
  function buildEmailBody(){
    const t=types.find(x=>x.id===form.type);
    return "Name: "+form.name+"\nEmail: "+form.email+"\nAffiliation: "+(form.affiliation||"Not provided")+"\nSubmission Type: "+(t?t.label:form.type)+"\nTitle: "+form.title+"\n\n--- ABSTRACT ---\n"+(form.abstract||"N/A")+"\n\n--- BODY ---\n"+(form.body||"N/A")+"\n\n---\nSubmitted via Tatari Institute platform";
  }
  function buildSubject(){
    const t=types.find(x=>x.id===form.type);
    return "[Tatari Institute] "+(t?t.label:"")+": "+form.title;
  }
  function handleMailto(){
    const url="mailto:info@tatari.systems?subject="+encodeURIComponent(buildSubject())+"&body="+encodeURIComponent(buildEmailBody());
    window.open(url,"_blank");
    setStatus("opened");
  }
  function handleCopy(){
    const text="TO: info@tatari.systems\nSUBJECT: "+buildSubject()+"\n\n"+buildEmailBody();
    if(navigator.clipboard&&navigator.clipboard.writeText){
      navigator.clipboard.writeText(text).then(()=>setStatus("copied")).catch(()=>fallbackCopy(text));
    }else{fallbackCopy(text);}
  }
  function fallbackCopy(text){
    const ta=document.createElement("textarea");ta.value=text;ta.style.position="fixed";ta.style.left="-9999px";
    document.body.appendChild(ta);ta.select();
    try{document.execCommand("copy");setStatus("copied");}catch(e){setStatus("idle");}
    document.body.removeChild(ta);
  }
  function updateField(k,v){setForm(prev=>({...prev,[k]:v}));}
  const canSubmit=form.name.trim()&&form.email.trim()&&form.title.trim();
  const sf={fontFamily:"'SF Mono',monospace"};
  const inp={width:"100%",fontFamily:"'Inter',sans-serif",fontSize:11,color:"rgba(255,255,255,0.8)",background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:5,padding:"8px 12px",outline:"none",boxSizing:"border-box"};
  return (
    <div className="ti-research-wrap" style={{paddingTop:80,maxWidth:680,margin:"0 auto",padding:"80px 36px 60px"}}>
      <div style={{...sf,fontSize:9,color:"rgba(255,255,255,0.2)",letterSpacing:"0.14em",marginBottom:4}}>CONTRIBUTE</div>
      <h2 style={{fontFamily:"'Instrument Serif',Georgia,serif",fontSize:28,fontWeight:400,color:"#fff",margin:"0 0 6px"}}>Call for Contributions</h2>
      <p style={{fontFamily:"'Inter',sans-serif",fontSize:11,color:"rgba(255,255,255,0.35)",marginBottom:8,lineHeight:1.6}}>
        Tatari Institute accepts original research notes, signal submissions, data corrections, and methodology critiques from analysts, operators, academics, and infrastructure professionals.
      </p>
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:24,alignItems:"center"}}>
        <a href="mailto:info@tatari.systems" target="_blank" rel="noopener noreferrer"
          style={{...sf,fontSize:8,color:"rgba(100,180,255,0.7)",textDecoration:"none",padding:"4px 10px",background:"rgba(100,180,255,0.06)",border:"1px solid rgba(100,180,255,0.15)",borderRadius:4,display:"inline-flex",alignItems:"center",gap:4}}>
          info@tatari.systems
        </a>
        <span style={{...sf,fontSize:7,color:"rgba(255,255,255,0.12)"}}>Responses within 5 business days</span>
      </div>
      {/* Editorial standards */}
      <div style={{padding:"14px 16px",background:"rgba(255,255,255,0.015)",border:"1px solid rgba(255,255,255,0.05)",borderRadius:6,marginBottom:28}}>
        <div style={{...sf,fontSize:8,color:"rgba(255,255,255,0.25)",letterSpacing:"0.1em",marginBottom:8}}>EDITORIAL STANDARDS</div>
        {["All claims must carry provenance: FACT, EST, INFERENCE, or PARTIAL.","External data must be cited with source title, URL, and access date.","Tatari does not publish unattributed assertions or undisclosed interests.","Research notes should address infrastructure decision-makers, not general audiences.","Signal submissions require a verified source URL and explicit epistemic tag."].map((s,i)=>(
          <div key={i} style={{display:"flex",gap:6,marginBottom:4}}>
            <div style={{width:3,height:3,borderRadius:"50%",background:"rgba(255,255,255,0.15)",marginTop:6,flexShrink:0}} />
            <span style={{fontFamily:"'Inter',sans-serif",fontSize:10,color:"rgba(255,255,255,0.3)",lineHeight:1.5}}>{s}</span>
          </div>
        ))}
      </div>
      {/* Type selector */}
      <div style={{...sf,fontSize:8,color:"rgba(255,255,255,0.2)",letterSpacing:"0.1em",marginBottom:8}}>SUBMISSION TYPE</div>
      <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:16}}>
        {types.map(t=>{const active=form.type===t.id;return(
          <button key={t.id} onClick={()=>updateField("type",t.id)}
            style={{...sf,fontSize:8,cursor:"pointer",padding:"5px 10px",borderRadius:4,transition:"all 0.15s",
              color:active?"#000":"rgba(255,255,255,0.4)",
              background:active?"rgba(255,255,255,0.85)":"transparent",
              border:"1px solid "+(active?"rgba(255,255,255,0.85)":"rgba(255,255,255,0.08)"),
              fontWeight:active?600:400}}>{t.label}</button>);
        })}
      </div>
      <p style={{fontFamily:"'Inter',sans-serif",fontSize:10,color:"rgba(255,255,255,0.25)",marginBottom:20,lineHeight:1.5,fontStyle:"italic"}}>
        {types.find(t=>t.id===form.type)?.desc}
      </p>
      {/* Form */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
        <div>
          <label style={{...sf,fontSize:7,color:"rgba(255,255,255,0.2)",letterSpacing:"0.08em",display:"block",marginBottom:4}}>NAME *</label>
          <input value={form.name} onChange={e=>updateField("name",e.target.value)} placeholder="Full name" style={inp} />
        </div>
        <div>
          <label style={{...sf,fontSize:7,color:"rgba(255,255,255,0.2)",letterSpacing:"0.08em",display:"block",marginBottom:4}}>EMAIL *</label>
          <input value={form.email} onChange={e=>updateField("email",e.target.value)} placeholder="Institutional email preferred" type="email" style={inp} />
        </div>
      </div>
      <div style={{marginBottom:12}}>
        <label style={{...sf,fontSize:7,color:"rgba(255,255,255,0.2)",letterSpacing:"0.08em",display:"block",marginBottom:4}}>AFFILIATION</label>
        <input value={form.affiliation} onChange={e=>updateField("affiliation",e.target.value)} placeholder="Organization, institution, or independent" style={inp} />
      </div>
      <div style={{marginBottom:12}}>
        <label style={{...sf,fontSize:7,color:"rgba(255,255,255,0.2)",letterSpacing:"0.08em",display:"block",marginBottom:4}}>TITLE *</label>
        <input value={form.title} onChange={e=>updateField("title",e.target.value)} placeholder="Concise descriptive title" style={inp} />
      </div>
      <div style={{marginBottom:12}}>
        <label style={{...sf,fontSize:7,color:"rgba(255,255,255,0.2)",letterSpacing:"0.08em",display:"block",marginBottom:4}}>ABSTRACT</label>
        <textarea value={form.abstract} onChange={e=>updateField("abstract",e.target.value)} placeholder="100-200 word summary" rows={3} style={{...inp,resize:"vertical"}} />
      </div>
      <div style={{marginBottom:20}}>
        <label style={{...sf,fontSize:7,color:"rgba(255,255,255,0.2)",letterSpacing:"0.08em",display:"block",marginBottom:4}}>BODY / NOTES</label>
        <textarea value={form.body} onChange={e=>updateField("body",e.target.value)} placeholder="Full text, signal details, or inquiry context" rows={6} style={{...inp,resize:"vertical"}} />
      </div>
      {/* Action buttons */}
      <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
        <button onClick={handleMailto} disabled={!canSubmit}
          style={{...sf,fontSize:9,letterSpacing:"0.06em",padding:"10px 20px",borderRadius:5,cursor:canSubmit?"pointer":"default",fontWeight:600,transition:"all 0.2s",
            color:canSubmit?"#000":"rgba(255,255,255,0.15)",
            background:canSubmit?"rgba(255,255,255,0.85)":"rgba(255,255,255,0.04)",
            border:"1px solid "+(canSubmit?"rgba(255,255,255,0.85)":"rgba(255,255,255,0.06)")}}>
          OPEN IN EMAIL CLIENT
        </button>
        <button onClick={handleCopy} disabled={!canSubmit}
          style={{...sf,fontSize:9,letterSpacing:"0.06em",padding:"10px 20px",borderRadius:5,cursor:canSubmit?"pointer":"default",fontWeight:500,transition:"all 0.2s",
            color:canSubmit?"rgba(255,255,255,0.6)":"rgba(255,255,255,0.1)",
            background:"transparent",
            border:"1px solid "+(canSubmit?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.04)")}}>
          {status==="copied"?"COPIED TO CLIPBOARD":"COPY EMAIL DRAFT"}
        </button>
        <a href="mailto:info@tatari.systems" target="_blank" rel="noopener noreferrer"
          style={{...sf,fontSize:8,color:"rgba(255,255,255,0.2)",textDecoration:"none"}}>or email directly</a>
      </div>
      {status==="opened"&&<div style={{marginTop:12,padding:"10px 14px",background:"rgba(30,215,96,0.06)",border:"1px solid rgba(30,215,96,0.15)",borderRadius:5}}>
        <span style={{fontFamily:"'Inter',sans-serif",fontSize:10,color:"rgba(30,215,96,0.7)"}}>Email client opened. If nothing appeared, copy the draft instead or email <strong>info@tatari.systems</strong> directly.</span>
      </div>}
      {status==="copied"&&<div style={{marginTop:12,padding:"10px 14px",background:"rgba(100,180,255,0.06)",border:"1px solid rgba(100,180,255,0.15)",borderRadius:5}}>
        <span style={{fontFamily:"'Inter',sans-serif",fontSize:10,color:"rgba(100,180,255,0.7)"}}>Draft copied. Paste into your email client and send to <strong>info@tatari.systems</strong>.</span>
      </div>}
      <p style={{...sf,fontSize:7,color:"rgba(255,255,255,0.08)",marginTop:16}}>Tatari Institute does not collect or store form data. All submissions route through your email client or clipboard.</p>
    </div>
  );
}

// ─── MAIN ───
export default function App(){
  const[scr,setScr]=useState(false);const[vis,setVis]=useState(false);const[ac,setAc]=useState(null);const[ap,setAp]=useState(null);const[view,setView]=useState("globe");const[globeMode,setGlobeMode]=useState("classification");
  useEffect(()=>{setTimeout(()=>setVis(true),150);},[]);
  useEffect(()=>{const h=()=>setScr(window.scrollY>50);window.addEventListener("scroll",h);return ()=>window.removeEventListener("scroll",h);},[]);
  const hCC=useCallback((id)=>{setAc((p)=>p===id?null:id);setAp(null);},[]);
  const cl=Object.entries(C).filter(([,c])=>c.sc).sort((a,b)=>(b[1].sc.ovr||0)-(a[1].sc.ovr||0));

  return (<div style={{minHeight:"100vh",background:"#000",color:"#fff"}}>
    <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
    <style>{`@keyframes sI{from{transform:translateX(100%)}to{transform:translateX(0)}}@keyframes pulse{0%,100%{opacity:0.4}50%{opacity:0.8}}
.ti-hero{display:flex;min-height:82vh;padding:30px 36px 10px;position:relative;z-index:2}
.ti-hero-txt{flex:0 0 36%;display:flex;flex-direction:column;justify-content:center}
.ti-hero-globe{flex:0 0 64%;height:min(62vh,520px)}
.ti-nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;justify-content:space-between;align-items:center;gap:8px;transition:all 0.5s}
.ti-nav-logo{display:flex;align-items:center;gap:8px;flex-shrink:0}
.ti-nav-tabs{display:flex;gap:2px;flex-wrap:nowrap;overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none}
.ti-nav-tabs::-webkit-scrollbar{display:none}
.ti-section{padding:10px 36px 50px;position:relative;z-index:2}
.ti-tbl-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch}
.ti-tbl-wrap table{min-width:640px}
.ti-panel{position:fixed;top:0;right:0;bottom:0;width:min(540px,92vw);z-index:200;background:rgba(6,6,10,0.97);backdrop-filter:blur(40px);border-left:1px solid rgba(255,255,255,0.06);overflow-y:auto;animation:sI .35s cubic-bezier(.16,1,.3,1)}
.ti-panel-sm{width:min(480px,90vw);z-index:210}
.ti-footer{padding:36px;border-top:1px solid rgba(255,255,255,0.04);position:relative;z-index:2}
@media(max-width:768px){
.ti-hero{flex-direction:column-reverse;min-height:auto;padding:16px 16px 10px}
.ti-hero-txt{flex:none;width:100%}
.ti-hero-globe{flex:none;width:100%;height:50vw;min-height:220px;max-height:340px}
.ti-nav{padding:8px 12px!important;gap:4px;flex-wrap:wrap}
.ti-nav-logo span{font-size:9px!important}
.ti-nav-logo img{width:20px!important;height:20px!important}
.ti-nav-tabs{width:100%;gap:3px}
.ti-nav-tabs button{font-size:7px!important;padding:3px 6px!important}
.ti-section{padding:10px 16px 40px}
.ti-panel,.ti-panel-sm{width:100vw!important}
.ti-footer{padding:24px 16px}
.ti-class-wrap{padding:60px 16px 40px!important}
.ti-wt-wrap{padding:60px 16px 40px!important}
.ti-meth-wrap{padding:60px 16px 40px!important}
.ti-research-wrap{padding:60px 16px 40px!important}
.ti-stats{grid-template-columns:repeat(2,1fr)!important}
}`}</style>
    <div style={{position:"fixed",inset:0,zIndex:0,backgroundImage:"linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px)",backgroundSize:"80px 80px"}} />
    <div style={{position:"fixed",inset:0,zIndex:999,pointerEvents:"none",opacity:0.3,background:`url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.025'/%3E%3C/svg%3E")`}} />
    <nav className="ti-nav" style={{position:"fixed",top:0,left:0,right:0,zIndex:100,padding:scr?"10px 36px":"20px 36px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:8,background:scr?"rgba(0,0,0,0.92)":"transparent",backdropFilter:scr?"blur(30px)":"none",borderBottom:scr?"1px solid rgba(255,255,255,0.06)":"none",transition:"all 0.5s"}}>
      <div className="ti-nav-logo"><img src="data:image/jpeg;base64,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" alt="Tatari Institute" style={{width:28,height:28,borderRadius:4,objectFit:"cover",display:"block"}} /><span style={{fontFamily:"'Inter',sans-serif",fontWeight:500,fontSize:12,color:"rgba(255,255,255,0.9)",letterSpacing:"0.08em",textTransform:"uppercase"}}>Tatari Institute</span></div>
      <div className="ti-nav-tabs">{[["globe","Intelligence"],["classify","Classification"],["watchtower","Watchtower"],["podcast","Podcast"],["research","Research"],["methodology","Methodology"],["contribute","Contribute"]].map(([k,l])=>(<button key={k} onClick={()=>setView(k)} style={{fontFamily:"'Inter',sans-serif",fontSize:9,fontWeight:view===k?500:300,color:view===k?"#fff":"rgba(255,255,255,0.3)",background:view===k?"rgba(255,255,255,0.08)":"transparent",border:`1px solid ${view===k?"rgba(255,255,255,0.1)":"rgba(255,255,255,0.04)"}`,padding:"4px 10px",borderRadius:4,cursor:"pointer",letterSpacing:"0.04em",textTransform:"uppercase",whiteSpace:"nowrap",flexShrink:0}}>{l}</button>))}</div>
    </nav>

    {ac&&!ap&&<CPanel id={ac} onClose={()=>setAc(null)} onPj={(p)=>setAp(p)} />}
    {ap&&<PPanel id={ap} onClose={()=>setAp(null)} />}
    {(ac||ap)&&<div onClick={()=>{setAc(null);setAp(null);}} style={{position:"fixed",inset:0,zIndex:195,background:"rgba(0,0,0,0.4)"}} />}

    {view==="globe"&&<div style={{paddingTop:70}}>
      <section className="ti-hero">
        <div className="ti-hero-txt" style={{opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(40px)",transition:"all 1s"}}>
          <div style={{fontFamily:"'SF Mono',monospace",fontSize:9,color:"rgba(255,255,255,0.2)",letterSpacing:"0.14em",marginBottom:12}}>SOVEREIGN COMPUTE INTELLIGENCE</div>
          <h1 style={{fontFamily:"'Instrument Serif',Georgia,serif",fontSize:"clamp(24px,3vw,44px)",fontWeight:400,color:"#fff",lineHeight:1.08,margin:"0 0 10px"}}>Global Infrastructure<br/>Intelligence</h1>
          <p style={{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:300,color:"rgba(255,255,255,0.3)",lineHeight:1.6,maxWidth:360,marginBottom:12}}>{GC.length} countries classified · {Object.keys(C).length} deep-tracked · {Object.keys(P).length} projects · {W.length+LIVE_SIGNALS.length} signals · {GLOBE_MODES.length} analytical lenses</p>
          <div style={{fontFamily:"'SF Mono',monospace",fontSize:7,color:"rgba(255,255,255,0.15)",letterSpacing:"0.1em",marginBottom:6}}>ANALYTICAL LENS</div>
          <GlobeModeButtons activeMode={globeMode} setMode={setGlobeMode} />
          {globeMode==="classification"&&<BLeg />}
          <GlobeModePanel modeId={globeMode} />
        </div>
        <div className="ti-hero-globe" style={{opacity:vis?1:0,transition:"opacity 1.5s ease 0.3s"}}><Globe active={ac} onClick={hCC} mode={globeMode} /></div>
      </section>
      <section className="ti-section">
        <div style={{fontFamily:"'Inter',sans-serif",fontSize:10,fontWeight:500,color:"rgba(255,255,255,0.3)",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:12}}>Deep-Tracked Countries</div>
        <div className="ti-tbl-wrap"><table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr>{["","Country","Bucket","CSI","P2C","LPS","CCR","OVR","Score"].map((h,i)=>(<th key={i} style={{textAlign:i<2?"left":"center",padding:"6px 8px",fontFamily:"'SF Mono',monospace",fontSize:7,color:"rgba(255,255,255,0.2)",borderBottom:"1px solid rgba(255,255,255,0.05)"}}>{h}</th>))}</tr></thead>
        <tbody>{cl.map(([id,c],i)=>(<tr key={id} onClick={()=>setAc(id)} style={{cursor:"pointer",borderBottom:"1px solid rgba(255,255,255,0.02)"}} onMouseEnter={(e)=>e.currentTarget.style.background="rgba(255,255,255,0.025)"} onMouseLeave={(e)=>e.currentTarget.style.background="transparent"}>
          <td style={{padding:"6px 8px",fontSize:9,color:"rgba(255,255,255,0.12)",fontFamily:"'SF Mono',monospace"}}>{String(i+1).padStart(2,"0")}</td>
          <td style={{padding:"6px 8px",fontSize:11,fontWeight:500,color:"rgba(255,255,255,0.85)"}}>{c.n}</td>
          <td style={{padding:"6px 8px",textAlign:"center"}}><span style={{fontFamily:"'SF Mono',monospace",fontSize:8,color:`rgba(255,255,255,${BUCKETS[c.bk||8].op})`}}>{BUCKETS[c.bk||8].short}</span></td>
          {["csi","p2c","lps","ccr","ovr"].map((k)=>{const b=scoreBand(c.sc[k]);return (<td key={k} style={{padding:"6px 8px",textAlign:"center",fontFamily:"'SF Mono',monospace",fontSize:9,color:b.c,fontWeight:k==="ovr"?600:400}}>{b.label}</td>);})}
          <td style={{padding:"6px 8px",textAlign:"center"}}><span style={{fontFamily:"'SF Mono',monospace",fontSize:10,fontWeight:600,color:scoreBand(c.sc.ovr||0).c}}>{c.sc.ovr||"—"}</span></td>
        </tr>))}</tbody></table></div>
      </section>
    </div>}

    {view==="classify"&&<ClassView />}

    {view==="research"&&<div className="ti-research-wrap" style={{paddingTop:80,maxWidth:760,margin:"0 auto",padding:"80px 36px 50px"}}>
      <div style={{fontFamily:"'SF Mono',monospace",fontSize:9,color:"rgba(255,255,255,0.2)",letterSpacing:"0.14em",marginBottom:4}}>PUBLICATIONS</div>
      <h2 style={{fontFamily:"'Instrument Serif',Georgia,serif",fontSize:28,fontWeight:400,color:"#fff",margin:"0 0 4px"}}>Research</h2>
      <p style={{fontFamily:"'Inter',sans-serif",fontSize:10,color:"rgba(255,255,255,0.25)",marginBottom:28,lineHeight:1.6}}>
        {PUBS.length} publications · Mar 2026 · All claims carry provenance tags and confidence ratings
      </p>
      {PUBS.map((p)=>(
        <div key={p.id} style={{padding:"20px 0",borderBottom:"1px solid rgba(255,255,255,0.04)"}}>
          <div style={{display:"flex",gap:6,marginBottom:8,alignItems:"center",flexWrap:"wrap"}}>
            <span style={{fontFamily:"'SF Mono',monospace",fontSize:7,color:"rgba(200,150,255,0.7)",background:"rgba(200,150,255,0.06)",border:"1px solid rgba(200,150,255,0.12)",padding:"2px 6px",borderRadius:2,letterSpacing:"0.06em"}}>{p.tg.toUpperCase()}</span>
            <span style={{fontFamily:"'SF Mono',monospace",fontSize:7,color:"rgba(255,255,255,0.2)"}}>{p.d}</span>
          </div>
          <h3 style={{fontFamily:"'Instrument Serif',Georgia,serif",fontSize:20,fontWeight:400,color:"#fff",margin:"0 0 4px",lineHeight:1.2}}>{p.t}</h3>
          <div style={{fontFamily:"'Inter',sans-serif",fontSize:9,color:"rgba(255,255,255,0.25)",marginBottom:8}}>
            {p.a==="Tatari Institute"?"Tatari Institute":`By ${p.a} · Tatari Institute`}
          </div>
          <p style={{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:300,color:"rgba(255,255,255,0.4)",lineHeight:1.6,margin:0}}>{p.ab}</p>
        </div>
      ))}
      <div style={{marginTop:36,padding:"14px 16px",background:"rgba(255,255,255,0.01)",border:"1px solid rgba(255,255,255,0.04)",borderRadius:6}}>
        <div style={{fontFamily:"'SF Mono',monospace",fontSize:7,color:"rgba(255,255,255,0.2)",marginBottom:6,letterSpacing:"0.1em"}}>EPISTEMIC FRAMEWORK</div>
        <p style={{fontFamily:"'Inter',sans-serif",fontSize:10,color:"rgba(255,255,255,0.25)",lineHeight:1.6,margin:0}}>
          All Tatari publications distinguish between <span style={{color:"rgba(255,255,255,0.45)"}}>FACT</span> (verified primary source),{" "}
          <span style={{color:"rgba(255,255,255,0.45)"}}>EST</span> (estimate with stated basis),{" "}
          <span style={{color:"rgba(255,255,255,0.45)"}}>INFERENCE</span> (analyst judgment from evidence), and{" "}
          <span style={{color:"rgba(255,255,255,0.45)"}}>PARTIAL</span> (incomplete sourcing flagged).
          Scores represent analyst assessments, not algorithmic outputs. Confidence is declared, not implied.
        </p>
      </div>
    </div>}

    {view==="watchtower"&&<WatchtowerView />}
    {view==="methodology"&&<MethodologyView />}
    {view==="podcast"&&<PodcastView />}
    {view==="contribute"&&<ContributeView />}

    <footer style={{padding:"36px",borderTop:"1px solid rgba(255,255,255,0.04)",position:"relative",zIndex:2}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}><div style={{display:"flex",alignItems:"center",gap:8}}><img src="data:image/jpeg;base64,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" alt="Tatari Institute" style={{width:22,height:22,borderRadius:3,objectFit:"cover",display:"block"}} /><span style={{fontFamily:"'Inter',sans-serif",fontSize:10,fontWeight:500,color:"rgba(255,255,255,0.5)",letterSpacing:"0.06em",textTransform:"uppercase"}}>Tatari Institute</span></div><span style={{fontFamily:"'Inter',sans-serif",fontSize:9,color:"rgba(255,255,255,0.12)"}}>research@tatari.institute · © 2026 Tatari LLC</span><span style={{fontFamily:"'SF Mono',monospace",fontSize:8,color:"rgba(255,255,255,0.08)"}}>BOS · DFW · ADD</span></div></footer>
  </div>);
}
