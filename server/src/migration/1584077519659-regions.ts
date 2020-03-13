import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { Region } from "../entity/Region";
import { Branch } from "../entity/Branch";

export class regions1584077519659 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const regionList = [
      { region_code: "GMA", name: "Greater Manila Area" },
      { region_code: "MRO", name: "Mindanao Regional Office" },
      { region_code: "NLR", name: "Northern Luzon Region" },
      { region_code: "NMR", name: "North Mindanao Region" },
      { region_code: "SLR", name: "Southern Luzon Region" },
      { region_code: "SMR", name: "Southern Mindanao Region" },
      { region_code: "VRO", name: "Visayas Region" },
      { region_code: "EMR", name: "Eastern Mindanao Region" },
      { region_code: "WVR", name: "Western Visayas Region" }
    ];

    const branchList = [
      {
        code: "02",
        name: "02-Baguio",
        region_code: "NLR"
      },
      {
        code: "03",
        name: "03-Dagupan",
        region_code: "NLR"
      },
      {
        code: "04",
        name: "04-Laoag",
        region_code: "NLR"
      },
      {
        code: "08",
        name: "08-La Union",
        region_code: "NLR"
      },
      {
        code: "14",
        name: "14-Vigan",
        region_code: "NLR"
      },
      {
        code: "15",
        name: "15-Urdaneta_old",
        region_code: "NLR"
      },
      {
        code: "42",
        name: "42-Alaminos_old",
        region_code: "NLR"
      },
      {
        code: "05",
        name: "05-Cabanatuan_old",
        region_code: "NLR"
      },
      {
        code: "07",
        name: "07-Isabela Area Office",
        region_code: "NLR"
      },
      {
        code: "12",
        name: "12-Tuguegarao",
        region_code: "NLR"
      },
      {
        code: "16",
        name: "16-Solano",
        region_code: "NLR"
      },
      {
        code: "20",
        name: "20-Cauayan",
        region_code: "NLR"
      },
      {
        code: "45",
        name: "45-Gapan_old",
        region_code: "NLR"
      },
      {
        code: "06",
        name: "06-San Fernando",
        region_code: "NLR"
      },
      {
        code: "09",
        name: "09-Bataan",
        region_code: "NLR"
      },
      {
        code: "10",
        name: "10-Olongapo",
        region_code: "NLR"
      },
      {
        code: "11",
        name: "11-BULACAN AREA OFFICE",
        region_code: "NLR"
      },
      {
        code: "47",
        name: "47-Tarlac_old",
        region_code: "NLR"
      },
      {
        code: "17",
        name: "17-Dau",
        region_code: "NLR"
      },
      {
        code: "18",
        name: "18-Malolos",
        region_code: "NLR"
      },
      {
        code: "21",
        name: "21-Tanay_old",
        region_code: "SLR"
      },
      {
        code: "32",
        name: "32-Cainta _toGMAMMD",
        region_code: "SLR"
      },
      {
        code: "46",
        name: "46-Meycauayan _toGMAMMD",
        region_code: "SLR"
      },
      {
        code: "94",
        name: "94-Mandaluyong _toGMAMMD",
        region_code: "SLR"
      },
      {
        code: "37",
        name: "37-Las Pinas_old",
        region_code: "SLR"
      },
      {
        code: "22",
        name: "22-Fairview _toGMAMMD",
        region_code: "SLR"
      },
      {
        code: "19",
        name: "19-Caloocan _toGMAMMD",
        region_code: "SLR"
      },
      {
        code: "38",
        name: "38-Dasmarinas_old",
        region_code: "SLR"
      },
      {
        code: "40",
        name: "40-Gen. Trias_old",
        region_code: "SLR"
      },
      {
        code: "24",
        name: "24-Batangas_old",
        region_code: "SLR"
      },
      {
        code: "26",
        name: "26-Calapan_old",
        region_code: "SLR"
      },
      {
        code: "28",
        name: "28-Balayan_old",
        region_code: "SLR"
      },
      {
        code: "39",
        name: "39-Palawan_old",
        region_code: "SLR"
      },
      {
        code: "25",
        name: "25-Calamba_old",
        region_code: "SLR"
      },
      {
        code: "31",
        name: "31-Lucena",
        region_code: "SLR"
      },
      {
        code: "36",
        name: "36-Sta. Cruz_old",
        region_code: "SLR"
      },
      {
        code: "34",
        name: "34-San Pablo_old",
        region_code: "SLR"
      },
      {
        code: "48",
        name: "48-Gumaca_old",
        region_code: "SLR"
      },
      {
        code: "49",
        name: "49-San Pedro_old",
        region_code: "SLR"
      },
      {
        code: "44",
        name: "44-Marinduque (Boac)_old",
        region_code: "SLR"
      },
      {
        code: "27",
        name: "27-Daet",
        region_code: "SLR"
      },
      {
        code: "29",
        name: "29-Iriga",
        region_code: "SLR"
      },
      {
        code: "30",
        name: "30-Legaspi",
        region_code: "SLR"
      },
      {
        code: "33",
        name: "33-Naga",
        region_code: "SLR"
      },
      {
        code: "35",
        name: "35-Sorsogon",
        region_code: "SLR"
      },
      {
        code: "41",
        name: "41-Masbate",
        region_code: "SLR"
      },
      {
        code: "51",
        name: "51-Cebu",
        region_code: "VRO"
      },
      {
        code: "52",
        name: "52-Maasin_old",
        region_code: "VRO"
      },
      {
        code: "54",
        name: "54-Ormoc_old",
        region_code: "VRO"
      },
      {
        code: "55",
        name: "55-Tagbilaran",
        region_code: "VRO"
      },
      {
        code: "56",
        name: "56-Tacloban_old",
        region_code: "VRO"
      },
      {
        code: "63",
        name: "63-Mandaue",
        region_code: "VRO"
      },
      {
        code: "64",
        name: "64-Toledo",
        region_code: "VRO"
      },
      {
        code: "50",
        name: "Calbayog_old",
        region_code: "VRO"
      },
      {
        code: "53",
        name: "53-Dumaguete",
        region_code: "WVR"
      },
      {
        code: "58",
        name: "58-Bacolod",
        region_code: "WVR"
      },
      {
        code: "62",
        name: "62-Kabankalan",
        region_code: "WVR"
      },
      {
        code: "57",
        name: "57-Antique",
        region_code: "WVR"
      },
      {
        code: "59",
        name: "59-Roxas",
        region_code: "WVR"
      },
      {
        code: "60",
        name: "60-Iloilo",
        region_code: "WVR"
      },
      {
        code: "61",
        name: "61-Kalibo",
        region_code: "WVR"
      },
      {
        code: "65",
        name: "65-Oroquieta",
        region_code: "NMR"
      },
      {
        code: "66",
        name: "66-Ozamis",
        region_code: "NMR"
      },
      {
        code: "67",
        name: "67-Pagadian",
        region_code: "NMR"
      },
      {
        code: "68",
        name: "68-Dipolog",
        region_code: "NMR"
      },
      {
        code: "73",
        name: "73-Zamboanga",
        region_code: "NMR"
      },
      {
        code: "87",
        name: "87-Ipil",
        region_code: "NMR"
      },
      {
        code: "76",
        name: "76-Gensan_old",
        region_code: "MRO"
      },
      {
        code: "79",
        name: "79-Digos_old",
        region_code: "MRO"
      },
      {
        code: "80",
        name: "80-Koronadal_old",
        region_code: "MRO"
      },
      {
        code: "81",
        name: "81-Tacurong_old",
        region_code: "MRO"
      },
      {
        code: "84",
        name: "84-Kidapawan_old",
        region_code: "MRO"
      },
      {
        code: "85",
        name: "85-Midsayap_old",
        region_code: "MRO"
      },
      {
        code: "90",
        name: "90-Polomolok_old",
        region_code: "MRO"
      },
      {
        code: "93",
        name: "93-Calumpang_old",
        region_code: "MRO"
      },
      {
        code: "69",
        name: "69-Surigao",
        region_code: "NMR"
      },
      {
        code: "70",
        name: "70-Butuan",
        region_code: "NMR"
      },
      {
        code: "72",
        name: "72-San Francisco",
        region_code: "NMR"
      },
      {
        code: "89",
        name: "89-Tandag",
        region_code: "NMR"
      },
      {
        code: "71",
        name: "71-Cagayan De Oro",
        region_code: "NMR"
      },
      {
        code: "74",
        name: "74-Iligan",
        region_code: "NMR"
      },
      {
        code: "75",
        name: "75-Valencia",
        region_code: "NMR"
      },
      {
        code: "91",
        name: "91-Gingoog",
        region_code: "NMR"
      },
      {
        code: "77",
        name: "77-Davao City",
        region_code: "SMR"
      },
      {
        code: "78",
        name: "78-Nabunturan",
        region_code: "SMR"
      },
      {
        code: "82",
        name: "82-Tagum",
        region_code: "SMR"
      },
      {
        code: "83",
        name: "83-Mati",
        region_code: "SMR"
      },
      {
        code: "86",
        name: "86-Panabo",
        region_code: "SMR"
      },
      {
        code: "88",
        name: "88-Matina",
        region_code: "SMR"
      },
      {
        code: "92",
        name: "92-Toril_old",
        region_code: "MRO"
      },
      {
        code: "NWL",
        name: "NWL-North West Luzon District",
        region_code: "NLR"
      },
      {
        code: "NEL",
        name: "NEL-North East Luzon District",
        region_code: "NLR"
      },
      {
        code: "CLD",
        name: "CLD-Central Luzon Distict",
        region_code: "NLR"
      },
      {
        code: "MMD",
        name: "MMD-Metro Manila _toGMA",
        region_code: "SLR"
      },
      {
        code: "BCD",
        name: "BCD-Batangas / Cavite_old",
        region_code: "SLR"
      },
      {
        code: "LQD",
        name: "LQD-Laguna / Quezon",
        region_code: "SLR"
      },
      {
        code: "BRD",
        name: "BRD-Bicol District",
        region_code: "SLR"
      },
      {
        code: "CVD",
        name: "CVD-Central Visayas District",
        region_code: "VRO"
      },
      {
        code: "NID",
        name: "NID-Negros Island District",
        region_code: "WVR"
      },
      {
        code: "PID",
        name: "PID-Panay Island District",
        region_code: "WVR"
      },
      {
        code: "WMD",
        name: "WMD-Western Mindanao District",
        region_code: "NMR"
      },
      {
        code: "SMD",
        name: "SMD-Southern Mindanao_old",
        region_code: "MRO"
      },
      {
        code: "CAR",
        name: "CAR-Caraga District",
        region_code: "NMR"
      },
      {
        code: "NMD",
        name: "NMD-Northern Mindanao District",
        region_code: "NMR"
      },
      {
        code: "DAV",
        name: "DAV-Davao District",
        region_code: "SMR"
      },
      {
        code: "NLR",
        name: "NLR-Northern Luzon Region",
        region_code: ""
      },
      {
        code: "SLR",
        name: "SLR-Southern Luzon Region",
        region_code: ""
      },
      {
        code: "VRO",
        name: "VRO-Visayas Region",
        region_code: ""
      },
      {
        code: "MRO (old)",
        name: "MRO-Mindanao Reg Off_old",
        region_code: ""
      },
      {
        code: "05S",
        name: "05S-San Jose N. E. BCO_old",
        region_code: "NLR"
      },
      {
        code: "06G",
        name: "06G-Guagua BCO_old",
        region_code: "NLR"
      },
      {
        code: "07R",
        name: "07R-Roxas, Isabela BCO_old",
        region_code: "NLR"
      },
      {
        code: "09M",
        name: "09M-Mariveles BCO",
        region_code: "NLR"
      },
      {
        code: "11J",
        name: "11J-San Jose Del Monte BCO_to22",
        region_code: "NLR"
      },
      {
        code: "12A",
        name: "12A-Aparri BCO_old",
        region_code: "NLR"
      },
      {
        code: "14C",
        name: "14C-Candon BCO _old",
        region_code: "NLR"
      },
      {
        code: "20I",
        name: "20I-Ilagan BCO",
        region_code: "NLR"
      },
      {
        code: "23",
        name: "23-Lipa_old",
        region_code: "SLR"
      },
      {
        code: "26S",
        name: "26S-San Jose Or. Mind BCO_old",
        region_code: "SLR"
      },
      {
        code: "28N",
        name: "28N-Nasugbu BCO_old",
        region_code: "SLR"
      },
      {
        code: "30V",
        name: "30V-Virac BCO",
        region_code: "SLR"
      },
      {
        code: "31C",
        name: "31C-Candelaria BCO",
        region_code: "SLR"
      },
      {
        code: "33S",
        name: "33S-Sipocot",
        region_code: "SLR"
      },
      {
        code: "34T",
        name: "34T-Tanauan BCO_old",
        region_code: "SLR"
      },
      {
        code: "35B",
        name: "35B-Irosin",
        region_code: "SLR"
      },
      {
        code: "36S",
        name: "36S-Siniloan BCO_old",
        region_code: "SLR"
      },
      {
        code: "37P",
        name: "37P-Paranaque BCO_old",
        region_code: "SLR"
      },
      {
        code: "47P",
        name: "47P-Paniqui BCO_old",
        region_code: "NLR"
      },
      {
        code: "1K",
        name: "1K-Carcar",
        region_code: "VRO"
      },
      {
        code: "52S",
        name: "52S-Sogod BCO_old",
        region_code: "VRO"
      },
      {
        code: "53B",
        name: "53B-Bais",
        region_code: "WVR"
      },
      {
        code: "53A",
        name: "53A-Bayawan BCO",
        region_code: "WVR"
      },
      {
        code: "54N",
        name: "54N-Naval BCO_old",
        region_code: "VRO"
      },
      {
        code: "55U",
        name: "55U-Ubay BCO",
        region_code: "VRO"
      },
      {
        code: "58C",
        name: "58C-Cadiz BCO",
        region_code: "VRO"
      },
      {
        code: "58S",
        name: "58S-San CarlosNeg. Occ. BCO_old",
        region_code: "MRO"
      },
      {
        code: "59P",
        name: "59P-Passi BCO",
        region_code: "WVR"
      },
      {
        code: "60G",
        name: "60G-Guimaras BCO",
        region_code: "WVR"
      },
      {
        code: "60J",
        name: "60J-Sta. Barbara",
        region_code: "WVR"
      },
      {
        code: "61C",
        name: "61C-Caticlan BCO",
        region_code: "WVR"
      },
      {
        code: "63B",
        name: "63B-Bogo BCO _old",
        region_code: "VRO"
      },
      {
        code: "66T",
        name: "66T-Tubod BCO_old",
        region_code: "NMR"
      },
      {
        code: "67M",
        name: "67M-Molave BCO",
        region_code: "NMR"
      },
      {
        code: "68S",
        name: "68S-Sindangan BCO",
        region_code: "NMR"
      },
      {
        code: "70B",
        name: "70B-Bayugan BCO",
        region_code: "NMR"
      },
      {
        code: "72B",
        name: "72B-Bislig BCO_old",
        region_code: "MRO"
      },
      {
        code: "95",
        name: "95-Malaybalay",
        region_code: "NMR"
      },
      {
        code: "77B",
        name: "77B-Buhangin BCO _old",
        region_code: "SMR"
      },
      {
        code: "79M",
        name: "79M-Malita BCO_old",
        region_code: "MRO"
      },
      {
        code: "79B",
        name: "79B-Bansalan BCO_old",
        region_code: "MRO"
      },
      {
        code: "80S",
        name: "80S-Surallah BCO_old",
        region_code: "MRO"
      },
      {
        code: "81I",
        name: "81I-Isulan BCO_old",
        region_code: "MRO"
      },
      {
        code: "82M",
        name: "82M-Magugpo BCO _old",
        region_code: "SMR"
      },
      {
        code: "84A",
        name: "84A-Antipas BCO_old",
        region_code: "MRO"
      },
      {
        code: "88C",
        name: "88C-Calinan BCO_old",
        region_code: "MRO"
      },
      {
        code: "097",
        name: "097-Head Office",
        region_code: ""
      },
      {
        code: "96",
        name: "96-CORLEND",
        region_code: ""
      },
      {
        code: "098",
        name: "098-AFFCOS",
        region_code: ""
      },
      {
        code: "08A",
        name: "08A-Agoo BCO",
        region_code: "NLR"
      },
      {
        code: "54B",
        name: "54B-Baybay BCO_old",
        region_code: "VRO"
      },
      {
        code: "32A",
        name: "32A-Antipolo BCO _toGMAMMD",
        region_code: "SLR"
      },
      {
        code: "62S",
        name: "62S-San Carlos BCO",
        region_code: "VRO"
      },
      {
        code: "69D",
        name: "69D-Dapa BCO_old",
        region_code: "MRO"
      },
      {
        code: "74M",
        name: "74M-Maranding BCO _toBr",
        region_code: "MRO"
      },
      {
        code: "GF",
        name: "GF-GUEVARA FAMILY",
        region_code: ""
      },
      {
        code: "83L",
        name: "83L-Lupon BCO",
        region_code: "SMR"
      },
      {
        code: "90T",
        name: "90T-Tupi BCO_old",
        region_code: "MRO"
      },
      {
        code: "MRO-HRD/AD",
        name: "HRD/ADMIN_old",
        region_code: "MRO"
      },
      {
        code: "02B",
        name: "02B-La Trinidad,Benguet BCO_old",
        region_code: "NLR"
      },
      {
        code: "28L",
        name: "28L-Lemery BCO_old",
        region_code: "SLR"
      },
      {
        code: "04B",
        name: "04B-Batac BCO _old",
        region_code: "NLR"
      },
      {
        code: "05B",
        name: "05B-Baler BCO_old",
        region_code: "NLR"
      },
      {
        code: "06A",
        name: "06A-Apalit BCO",
        region_code: "NLR"
      },
      {
        code: "10I",
        name: "10I-Iba BCO",
        region_code: "NLR"
      },
      {
        code: "11S",
        name: "11S-Sta Maria Bus. Ctr. BCO_old",
        region_code: "NLR"
      },
      {
        code: "14B",
        name: "14B-Bangued BCO_old",
        region_code: "NLR"
      },
      {
        code: "15T",
        name: "15T-Tayug BCO_old",
        region_code: "NLR"
      },
      {
        code: "18S",
        name: "18S-Sta. Maria BCO",
        region_code: "NLR"
      },
      {
        code: "24R",
        name: "24R-Rosario BCO_old",
        region_code: "SLR"
      },
      {
        code: "25S",
        name: "25S-Sta Rosa Bus. Ctr. BCO_old",
        region_code: "SLR"
      },
      {
        code: "26P",
        name: "26P-Pinamalayan BCO_old",
        region_code: "SLR"
      },
      {
        code: "29G",
        name: "29G-Goa Bus. Ctr.BCO_old",
        region_code: "SLR"
      },
      {
        code: "30L",
        name: "30L-Ligao BCO",
        region_code: "SLR"
      },
      {
        code: "32S",
        name: "32S-San Mateo BCO _toGMAMMD",
        region_code: "SLR"
      },
      {
        code: "33G",
        name: "33G-Goa BCO _toIriga",
        region_code: "SLR"
      },
      {
        code: "40I",
        name: "40I-Imus Bus. Ctr. BCO_old",
        region_code: "SLR"
      },
      {
        code: "48C",
        name: "48C-Catanuan BCO_old",
        region_code: "SLR"
      },
      {
        code: "49A",
        name: "49A-Alabang BCO_old",
        region_code: "SLR"
      },
      {
        code: "1I",
        name: "1I-Lapu Lapu",
        region_code: "VRO"
      },
      {
        code: "69S",
        name: "69S-Siargao (Dapa) BCO_old",
        region_code: "MRO"
      },
      {
        code: "70C",
        name: "70C-Cabadbaran BCO",
        region_code: "NMR"
      },
      {
        code: "72T",
        name: "72T-Trento BCO _toBr",
        region_code: "MRO"
      },
      {
        code: "78M",
        name: "78M-Monkayo BCO",
        region_code: "SMR"
      },
      {
        code: "86C",
        name: "86C-Carmen BCO _old",
        region_code: "SMR"
      },
      {
        code: "50C",
        name: "50C-Catarman BCO_old",
        region_code: "VRO"
      },
      {
        code: "67T",
        name: "67T-Tubod BCO _trnsferNewBr",
        region_code: "NMR"
      },
      {
        code: "69P",
        name: "69P-Placer BCO",
        region_code: "NMR"
      },
      {
        code: "87B",
        name: "87B-Buug BCO",
        region_code: "NMR"
      },
      {
        code: "38T",
        name: "38T-Trece Martirez BCO_old",
        region_code: "SLR"
      },
      {
        code: "16D",
        name: "16D-Diffun BCO _trnsferNewBr",
        region_code: "NLR"
      },
      {
        code: "AADD",
        name: "AADD-Acquired Asset Disposal",
        region_code: ""
      },
      {
        code: "07A",
        name: "07A-Alicia BCO",
        region_code: "NLR"
      },
      {
        code: "19Q",
        name: "19Q-Quezon Ave BCO _toGMAMMD",
        region_code: "SLR"
      },
      {
        code: "20T",
        name: "20T-Tumauini BCO _trnsferNewBr",
        region_code: "NLR"
      },
      {
        code: "46M",
        name: "46M-Mindanao Ave BCO _tnsNewBr",
        region_code: "SLR"
      },
      {
        code: "71T",
        name: "71T-Tagoloan BCO",
        region_code: "NMR"
      },
      {
        code: "75W",
        name: "75W-Wao BCO",
        region_code: "NMR"
      },
      {
        code: "38A",
        name: "38A-Tagaytay BCO_old",
        region_code: "SLR"
      },
      {
        code: "SOC",
        name: "Soc-Soccsksargen District",
        region_code: "SMR"
      },
      {
        code: "CMD",
        name: "CMD-Central Mindanao District",
        region_code: "SMR"
      },
      {
        code: "PTD",
        name: "PTD-Pangasinan Tarlac District",
        region_code: "NLR"
      },
      {
        code: "EVD",
        name: "EVD-Eastern Visayas District",
        region_code: "VRO"
      },
      {
        code: "NMR",
        name: "NMR-North Mindanao Region",
        region_code: ""
      },
      {
        code: "SMR",
        name: "SMR-Southern Mindanao Region",
        region_code: ""
      },
      {
        code: "0I",
        name: "0I-Lubao",
        region_code: "NLR"
      },
      {
        code: "0A",
        name: "0A - Tanauan Branch",
        region_code: "SLR"
      },
      {
        code: "24B",
        name: "24B - BAUAN BCO_old",
        region_code: "SLR"
      },
      {
        code: "03B",
        name: "03B-Bayambang BCO _old",
        region_code: "NLR"
      },
      {
        code: "BMD",
        name: "BMD-Batangas-Mindoro District",
        region_code: "SLR"
      },
      {
        code: "62H",
        name: "62H-HINIGARAN BCO",
        region_code: "WVR"
      },
      {
        code: "34L",
        name: "34L-Los Banos BCO",
        region_code: "SLR"
      },
      {
        code: "58L",
        name: "58L- La Carlota BCO",
        region_code: "WVR"
      },
      {
        code: "0B",
        name: "0B-San Jose, OM",
        region_code: "SLR"
      },
      {
        code: "34",
        name: "34-San Pablo",
        region_code: "SLR"
      },
      {
        code: "92",
        name: "92-Toril",
        region_code: "SMR"
      },
      {
        code: "79",
        name: "79-Digos",
        region_code: "SMR"
      },
      {
        code: "84",
        name: "84-Kidapawan",
        region_code: "SMR"
      },
      {
        code: "85",
        name: "85-Midsayap",
        region_code: "SMR"
      },
      {
        code: "25",
        name: "25-Calamba _toRLQD",
        region_code: "SLR"
      },
      {
        code: "21",
        name: "21-Tanay _toCMS",
        region_code: "SLR"
      },
      {
        code: "76",
        name: "76-Gen Santos",
        region_code: "SMR"
      },
      {
        code: "80",
        name: "80-Koronadal",
        region_code: "SMR"
      },
      {
        code: "81",
        name: "81-Tacurong",
        region_code: "SMR"
      },
      {
        code: "90",
        name: "90-Polomolok",
        region_code: "SMR"
      },
      {
        code: "93",
        name: "93-Calumpang",
        region_code: "SMR"
      },
      {
        code: "47",
        name: "47-Tarlac",
        region_code: "NLR"
      },
      {
        code: "05",
        name: "05-Cabanatuan",
        region_code: "NLR"
      },
      {
        code: "45",
        name: "45-Gapan",
        region_code: "NLR"
      },
      {
        code: "15",
        name: "15-Urdaneta",
        region_code: "NLR"
      },
      {
        code: "23",
        name: "23-Lipa",
        region_code: "SLR"
      },
      {
        code: "24",
        name: "24-Batangas",
        region_code: "SLR"
      },
      {
        code: "26",
        name: "26-Calapan",
        region_code: "SLR"
      },
      {
        code: "28",
        name: "28-Balayan",
        region_code: "SLR"
      },
      {
        code: "38",
        name: "38-Dasmarinas _toGMACMS",
        region_code: "SLR"
      },
      {
        code: "40",
        name: "40-Gen. Trias _toGMACMS",
        region_code: "SLR"
      },
      {
        code: "49",
        name: "49-San Pedro _toGMACMS",
        region_code: "SLR"
      },
      {
        code: "37",
        name: "37-Las Pinas _toGMACMS",
        region_code: "SLR"
      },
      {
        code: "50",
        name: "50-Calbayog",
        region_code: "VRO"
      },
      {
        code: "52",
        name: "52-Maasin",
        region_code: "VRO"
      },
      {
        code: "54",
        name: "54-Ormoc",
        region_code: "VRO"
      },
      {
        code: "56",
        name: "56-Tacloban",
        region_code: "VRO"
      },
      {
        code: "24R",
        name: "24R-Rosario BCO",
        region_code: "SLR"
      },
      {
        code: "25S",
        name: "25S-Sta Rosa BCO _toRLQD",
        region_code: "SLR"
      },
      {
        code: "28N",
        name: "28N-Nasugbu BCO",
        region_code: "SLR"
      },
      {
        code: "37P",
        name: "37P-Paranaque BCO _toGMACMS",
        region_code: "SLR"
      },
      {
        code: "38T",
        name: "38T-Trece Martirez BCO _GMACMS",
        region_code: "SLR"
      },
      {
        code: "40I",
        name: "40I-Imus BCO _toBrGMACMS",
        region_code: "SLR"
      },
      {
        code: "47P",
        name: "47P-Paniqui BCO _old",
        region_code: "NLR"
      },
      {
        code: "52S",
        name: "52S-Sogod BCO",
        region_code: "VRO"
      },
      {
        code: "79M",
        name: "79M-Malita BCO _toBr",
        region_code: "SMR"
      },
      {
        code: "80S",
        name: "80S-Surallah BCO _toBr",
        region_code: "SMR"
      },
      {
        code: "84A",
        name: "84A-Antipas BCO _toBr",
        region_code: "SMR"
      },
      {
        code: "85L",
        name: "85L-Lebak BCO _toBr",
        region_code: "SMR"
      },
      {
        code: "90T",
        name: "90T-Tupi BCO",
        region_code: "SMR"
      },
      {
        code: "38A",
        name: "38A-Tagaytay BCO _toGMACMS",
        region_code: "SLR"
      },
      {
        code: "0F",
        name: "0F-San Jose, N.Ecija",
        region_code: "NLR"
      },
      {
        code: "05B",
        name: "05B-Baler BCO _old",
        region_code: "NLR"
      },
      {
        code: "15T",
        name: "15T-Tayug BCO",
        region_code: "NLR"
      },
      {
        code: "26P",
        name: "26P-Pinamalayan BCO",
        region_code: "SLR"
      },
      {
        code: "28L",
        name: "28L-Lemery BCO",
        region_code: "SLR"
      },
      {
        code: "49A",
        name: "49A-Alabang BCO _toGMACMS",
        region_code: "SLR"
      },
      {
        code: "50C",
        name: "50C-Catarman",
        region_code: "VRO"
      },
      {
        code: "54B",
        name: "54B-Baybay BCO _toMaasin",
        region_code: "VRO"
      },
      {
        code: "54N",
        name: "54N-Naval BCO",
        region_code: "VRO"
      },
      {
        code: "03A",
        name: "03A-Alaminos BCO _old",
        region_code: "NLR"
      },
      {
        code: "0G",
        name: "0G-Roxas NLR",
        region_code: "NLR"
      },
      {
        code: "0H",
        name: "0H-Bislig",
        region_code: "NMR"
      },
      {
        code: "39",
        name: "39-Palawan _toGMAMMD",
        region_code: "SLR"
      },
      {
        code: "44",
        name: "44-Marinduque (Boac)",
        region_code: "SLR"
      },
      {
        code: "48",
        name: "48-Gumaca",
        region_code: "SLR"
      },
      {
        code: "48C",
        name: "48C-Catanauan BCO",
        region_code: "SLR"
      },
      {
        code: "36",
        name: "36-Sta.Cruz",
        region_code: "SLR"
      },
      {
        code: "36S",
        name: "36S-Siniloan BCO",
        region_code: "SLR"
      },
      {
        code: "0D",
        name: "0D-Bansalan",
        region_code: "SMR"
      },
      {
        code: "84M",
        name: "84M-M`lang BCO _old",
        region_code: "SMR"
      },
      {
        code: "84K",
        name: "84K-Kabacan BCO _old",
        region_code: "SMR"
      },
      {
        code: "0C",
        name: "0C-Calinan",
        region_code: "SMR"
      },
      {
        code: "0E-old",
        name: "0E-Isulan-old",
        region_code: "SMR"
      },
      {
        code: "51T",
        name: "51T-Tabunok BCO",
        region_code: "VRO"
      },
      {
        code: "57C",
        name: "57C-Culasi BCO",
        region_code: "WVR"
      },
      {
        code: "0C",
        name: "0C-CALINAN_old",
        region_code: "SMR"
      },
      {
        code: "640",
        name: "640-AADD_old",
        region_code: "AADD"
      },
      {
        code: "21T",
        name: "21T-Taytay BCO _toCMS",
        region_code: "SLR"
      },
      {
        code: "69D",
        name: "69D-DAPA BCO",
        region_code: "NMR"
      },
      {
        code: "CMS",
        name: "CMS-Cavite Metro South _toGMA",
        region_code: "SLR"
      },
      {
        code: "LQD",
        name: "LQD-Laguna Qzn Dist_old",
        region_code: "SLR"
      },
      {
        code: "MRO",
        name: "MRO-Mindanao RegionalOffice_old",
        region_code: ""
      },
      {
        code: "0E",
        name: "OE-ISULAN BCO_old",
        region_code: "SMR"
      },
      {
        code: "RLQD",
        name: "RLQD-Rizal-Laguna-Quezon Dist",
        region_code: "SLR"
      },
      {
        code: "SMD",
        name: "SMD-Southern Mind District_old",
        region_code: "SMR"
      },
      {
        code: "06S",
        name: "06S-Sta. Ana BCO",
        region_code: "NLR"
      },
      {
        code: "0CM",
        name: "0CM-Mintal BCO",
        region_code: "SMR"
      },
      {
        code: "17A",
        name: "17A-Angeles BCO",
        region_code: "NLR"
      },
      {
        code: "24B",
        name: "24B-Bauan BCO",
        region_code: "SLR"
      },
      {
        code: "30T",
        name: "30T-Tabaco BCO",
        region_code: "SLR"
      },
      {
        code: "45Z",
        name: "45Z-Zaragosa BCO",
        region_code: "NLR"
      },
      {
        code: "47B",
        name: "47B-Capas BCO",
        region_code: "NLR"
      },
      {
        code: "47P",
        name: "47P-Paniqui BCO_old",
        region_code: "NLR"
      },
      {
        code: "72A",
        name: "72A-Barobo BCO",
        region_code: "NMR"
      },
      {
        code: "68P",
        name: "68P-Plaridel BCO_old",
        region_code: "NMR"
      },
      {
        code: "731",
        name: "731-Gov Camins BCO",
        region_code: "NMR"
      },
      {
        code: "911",
        name: "911-Balingoan BCO",
        region_code: "NMR"
      },
      {
        code: "89C",
        name: "89C-Cantilan BCO",
        region_code: "NMR"
      },
      {
        code: "742",
        name: "742-Initao BCO",
        region_code: "NMR"
      },
      {
        code: "462",
        name: "462-Balagtas BCO _toGMAMMD",
        region_code: "SLR"
      },
      {
        code: "11R",
        name: "11R-San Ildefonso BCO",
        region_code: "NLR"
      },
      {
        code: "712",
        name: "712-Bulua BCO",
        region_code: "NMR"
      },
      {
        code: "762",
        name: "762-Glan BCO",
        region_code: "SMR"
      },
      {
        code: "2H",
        name: "2H-Don Carlos Bukidnon",
        region_code: "NMR"
      },
      {
        code: "822",
        name: "822-Kapalong BCO",
        region_code: "SMR"
      },
      {
        code: "802",
        name: "802-Norala BCO",
        region_code: "SMR"
      },
      {
        code: "79P",
        name: "79P-Padada BCO",
        region_code: "SMR"
      },
      {
        code: "55T",
        name: "55T-Tubigon",
        region_code: "VRO"
      },
      {
        code: "482",
        name: "482-Lopez BCO",
        region_code: "SLR"
      },
      {
        code: "22N",
        name: "22N-Novaliches BCO _toGMAMMD",
        region_code: "SLR"
      },
      {
        code: "50E",
        name: "50E-Catbalogan BCO",
        region_code: "VRO"
      },
      {
        code: "60E",
        name: "60E-Estancia BCO_old",
        region_code: "VRO"
      },
      {
        code: "022",
        name: "022-Abatan Buguias BCO _to0R",
        region_code: "NLR"
      },
      {
        code: "543",
        name: "543-Palompon BCO",
        region_code: "VRO"
      },
      {
        code: "333",
        name: "333-Pili BCO",
        region_code: "SLR"
      },
      {
        code: "402",
        name: "402-Molino BCO _toGMACMS",
        region_code: "SLR"
      },
      {
        code: "0J",
        name: "0J-IMUS CAVITE",
        region_code: "GMA"
      },
      {
        code: "0K",
        name: "0K-Maranding",
        region_code: "NMR"
      },
      {
        code: "0L",
        name: "0L-Trento",
        region_code: "NMR"
      },
      {
        code: "0M",
        name: "0M-Malita",
        region_code: "SMR"
      },
      {
        code: "0N",
        name: "0N-Antipas",
        region_code: "SMR"
      },
      {
        code: "0O",
        name: "0O-Lebak",
        region_code: "SMR"
      },
      {
        code: "0P",
        name: "0P-Surallah",
        region_code: "SMR"
      },
      {
        code: "GMA",
        name: "GMA-Greater Manila Area",
        region_code: ""
      },
      {
        code: "07D",
        name: "07D-DIFFUN BCO",
        region_code: "NLR"
      },
      {
        code: "12T",
        name: "12T-Tumauini BCO _to0G",
        region_code: "NLR"
      },
      {
        code: "94M",
        name: "94M-Mindanao Ave BCO",
        region_code: "GMA"
      },
      {
        code: "0KT",
        name: "0KT-Tubod BCO",
        region_code: "NMR"
      },
      {
        code: "25",
        name: "25-Calamba",
        region_code: "SLR"
      },
      {
        code: "25S",
        name: "25S-Sta Rosa BCO",
        region_code: "SLR"
      },
      {
        code: "CMS",
        name: "CMS-Cavite Metro South District",
        region_code: "GMA"
      },
      {
        code: "21",
        name: "21-Tanay _toMMD",
        region_code: "GMA"
      },
      {
        code: "21T",
        name: "21T-Taytay BCO _to32",
        region_code: "GMA"
      },
      {
        code: "37",
        name: "37-Las Pinas",
        region_code: "GMA"
      },
      {
        code: "37P",
        name: "37P-Paranaque BCO",
        region_code: "GMA"
      },
      {
        code: "38",
        name: "38-Dasmarinas",
        region_code: "GMA"
      },
      {
        code: "38A",
        name: "38A-Tagaytay BCO",
        region_code: "GMA"
      },
      {
        code: "38T",
        name: "38T-Trece Martirez BCO",
        region_code: "GMA"
      },
      {
        code: "40",
        name: "40-Gen Trias",
        region_code: "GMA"
      },
      {
        code: "402",
        name: "402-Molino BCO",
        region_code: "GMA"
      },
      {
        code: "49",
        name: "49-San Pedro _toSLR",
        region_code: "GMA"
      },
      {
        code: "49A",
        name: "49A-Alabang BCO _to37",
        region_code: "GMA"
      },
      {
        code: "MMD",
        name: "MMD-Metro Manila District",
        region_code: "GMA"
      },
      {
        code: "19",
        name: "19-Manila Area Office",
        region_code: "GMA"
      },
      {
        code: "19Q",
        name: "19Q-Quezon Ave BCO",
        region_code: "GMA"
      },
      {
        code: "22",
        name: "22-Fairview",
        region_code: "GMA"
      },
      {
        code: "22N",
        name: "22N-Novaliches BCO",
        region_code: "GMA"
      },
      {
        code: "32",
        name: "32-Cainta",
        region_code: "GMA"
      },
      {
        code: "32A",
        name: "32A-Antipolo BCO _old",
        region_code: "GMA"
      },
      {
        code: "32S",
        name: "32S-San Mateo BCO",
        region_code: "GMA"
      },
      {
        code: "39",
        name: "39-Palawan",
        region_code: "GMA"
      },
      {
        code: "94",
        name: "94-Mandaluyong",
        region_code: "GMA"
      },
      {
        code: "462",
        name: "462-Balagtas BCO _old",
        region_code: "GMA"
      },
      {
        code: "46",
        name: "46-Meycauayan",
        region_code: "GMA"
      },
      {
        code: "91M",
        name: "91M-Mambajao BCO",
        region_code: "NMR"
      },
      {
        code: "29G",
        name: "29G-Goa BCO",
        region_code: "SLR"
      },
      {
        code: "52B",
        name: "52B-Baybay BCO",
        region_code: "VRO"
      },
      {
        code: "0GT",
        name: "0GT-Tumauini BCO",
        region_code: "NLR"
      },
      {
        code: "583",
        name: "583-Silay BCO",
        region_code: "WVR"
      },
      {
        code: "0Q",
        name: "0Q-GARB",
        region_code: ""
      },
      {
        code: "XX",
        name: "XX-La Trinidad_old",
        region_code: "NLR"
      },
      {
        code: "0R",
        name: "0R-La Trinidad, Benguet",
        region_code: "NLR"
      },
      {
        code: "AU",
        name: "AU-AUB ACCOUNT",
        region_code: ""
      },
      {
        code: "59E",
        name: "59E-Estancia BCO",
        region_code: "WVR"
      },
      {
        code: "BED",
        name: "BED-Bulacan Ecija District",
        region_code: "NLR"
      },
      {
        code: "CARLA",
        name: "CARLA-Cordillera-La Union",
        region_code: "NLR"
      },
      {
        code: "ILD",
        name: "ILD-Ilocos District",
        region_code: "NLR"
      },
      {
        code: "921",
        name: "921-Samal BCO",
        region_code: "SMR"
      },
      {
        code: "633",
        name: "633-Consolacion BCO",
        region_code: "VRO"
      },
      {
        code: "513",
        name: "513-Minglanilla",
        region_code: "VRO"
      },
      {
        code: "561",
        name: "561-Palo BCO",
        region_code: "VRO"
      },
      {
        code: "22J",
        name: "22J-San Jose Del Monte BCO",
        region_code: "GMA"
      },
      {
        code: "32T",
        name: "32T-Taytay BCO",
        region_code: "GMA"
      },
      {
        code: "49",
        name: "49-San Pedro",
        region_code: "SLR"
      },
      {
        code: "37A",
        name: "37A-Alabang BCO",
        region_code: "GMA"
      },
      {
        code: "21",
        name: "21-Tanay",
        region_code: "GMA"
      },
      {
        code: "0R2",
        name: "0R2-Abatan Buguias BCO",
        region_code: "NLR"
      },
      {
        code: "0W",
        name: "0W-Rizal Area Office",
        region_code: "GMA"
      },
      {
        code: "1A",
        name: "1A-Batac",
        region_code: "NLR"
      },
      {
        code: "0Z",
        name: "0Z-Candon",
        region_code: "NLR"
      },
      {
        code: "0S",
        name: "0S-Alaminos",
        region_code: "NLR"
      },
      {
        code: "0Y",
        name: "0Y-Baler",
        region_code: "NLR"
      },
      {
        code: "0T",
        name: "0T-Paniqui",
        region_code: "NLR"
      },
      {
        code: "0X",
        name: "0X-Bogo",
        region_code: "VRO"
      },
      {
        code: "1B",
        name: "1B-San Carlos",
        region_code: "WVR"
      },
      {
        code: "1C",
        name: "1C-Cabadbaran",
        region_code: "NMR"
      },
      {
        code: "1D",
        name: "1D-Buhangin",
        region_code: "SMR"
      },
      {
        code: "0V",
        name: "0V-Carmen",
        region_code: "SMR"
      },
      {
        code: "1E",
        name: "1E-Magugpo",
        region_code: "SMR"
      },
      {
        code: "1F",
        name: "1F-Lupon",
        region_code: "SMR"
      },
      {
        code: "1G",
        name: "1G-Kabacan",
        region_code: "SMR"
      },
      {
        code: "0U",
        name: "0U-Mlang",
        region_code: "SMR"
      },
      {
        code: "94P",
        name: "94P-Pasig BCO",
        region_code: "GMA"
      },
      {
        code: "84M",
        name: "84M-Makilala",
        region_code: "SMR"
      },
      {
        code: "40C",
        name: "40C-Cavite City BCO",
        region_code: "GMA"
      },
      {
        code: "1M",
        name: "1M-Star Mall",
        region_code: "GMA"
      },
      {
        code: "1L",
        name: "1L-Fisher Mall",
        region_code: "GMA"
      },
      {
        code: "XA",
        name: "XA - Tanauan Fraud",
        region_code: "SLR"
      },
      {
        code: "1H",
        name: "1H – HO Branch",
        region_code: "GMA"
      },
      {
        code: "1J",
        name: "1J-Sogod",
        region_code: "VRO"
      },
      {
        code: "1N",
        name: "1N-Robinsons Dasma",
        region_code: "GMA"
      },
      {
        code: "21B",
        name: "21B - Binangonan BCO",
        region_code: "GMA"
      },
      {
        code: "0IG",
        name: "0IG-Guagua BCO",
        region_code: "NLR"
      },
      {
        code: "65C",
        name: "65C-Calamba Misamis Occ BCO",
        region_code: "NMR"
      },
      {
        code: "0MS",
        name: "0MS-Sta.Maria BCO",
        region_code: "SMR"
      },
      {
        code: "0UT",
        name: "0UT-Tulunan",
        region_code: "SMR"
      },
      {
        code: "79K",
        name: "79K- Kapatagan BCO",
        region_code: "SMR"
      },
      {
        code: "79S",
        name: "79S-Sta.Cruz BCO",
        region_code: "SMR"
      },
      {
        code: "85P",
        name: "85P-Pigcawayan",
        region_code: "SMR"
      },
      {
        code: "76S",
        name: "76S-San Isidro",
        region_code: "SMR"
      },
      {
        code: "81E",
        name: "81E - Esperanza BCO",
        region_code: "SMR"
      },
      {
        code: "93K",
        name: "93K-Kiamba BCO",
        region_code: "SMR"
      },
      {
        code: "MDA",
        name: "MDA-Metro Davao Area District",
        region_code: "SMR"
      },
      {
        code: "NCM",
        name: "NCM-North Central Mindanao District",
        region_code: "NMR"
      },
      {
        code: "EMD",
        name: "EMD-Eastern Mindanao District",
        region_code: "NMR"
      },
      {
        code: "40G",
        name: "40G-Cavite",
        region_code: "GMA"
      },
      {
        code: "0BS",
        name: "0BS-Sablayan",
        region_code: "SLR"
      },
      {
        code: "1P",
        name: "1P-Cebu South",
        region_code: "VRO"
      },
      {
        code: "1Q",
        name: "1Q-San Ildefonso",
        region_code: "NLR"
      },
      {
        code: "1R",
        name: "1R-Sta. Rosa",
        region_code: "SLR"
      },
      {
        code: "1O",
        name: "1O-San Isidro",
        region_code: "SMR"
      },
      {
        code: "BNE",
        name: "BNE-Bulacan Area District",
        region_code: "NLR"
      },
      {
        code: "PCL",
        name: "PCL-Pangasinan-CAR-La Union",
        region_code: "NLR"
      },
      {
        code: "0IG",
        name: "0IG-Guagua",
        region_code: "NLR"
      },
      {
        code: "49A",
        name: "49A-Alabang BCO",
        region_code: "SLR "
      },
      {
        code: "0J2",
        name: "0J2-Molino BCO",
        region_code: "GMA"
      },
      {
        code: "32P",
        name: "32P-Pasig BCO ",
        region_code: "GMA"
      },
      {
        code: "19M",
        name: "19M-Mindanao Avenue BCO ",
        region_code: "GMA"
      },
      {
        code: "RZL",
        name: "RZL-Rizal District",
        region_code: "GMA"
      },
      {
        code: "1S",
        name: "1S-Sta. Lucia Mall",
        region_code: "GMA"
      },
      {
        code: "75M",
        name: "75M - Maramag BCO",
        region_code: "NMR"
      },
      {
        code: "23L",
        name: "23L-Lipa LIC",
        region_code: "SLR"
      },
      {
        code: "26R",
        name: "26R-Roxas BCO",
        region_code: "SLR"
      },
      {
        code: "1EP",
        name: "1EP-Pantukan BCO",
        region_code: "SMR"
      },
      {
        code: "83B",
        name: "83B-Baganga",
        region_code: "SMR"
      },
      {
        code: "76A",
        name: "76A-Alabel BCO",
        region_code: "SMR"
      },
      {
        code: "1T",
        name: "1T-CDO-Iponan",
        region_code: "NMR"
      },
      {
        code: "11R",
        name: "11R-San Ildefonso BCO",
        region_code: "NLR"
      },
      {
        code: "XB",
        name: "XB-DLLG",
        region_code: "GMA"
      },
      {
        code: "25L",
        name: "25L-Los Banos BCO",
        region_code: "SLR"
      },
      {
        code: "EMR",
        name: "EMR - Eastern Mindanao Region",
        region_code: ""
      },
      {
        code: "DAV",
        name: "DAV-Davao District",
        region_code: "EMR"
      },
      {
        code: "EMD",
        name: "EMD-Eastern Mindanao District",
        region_code: "EMR"
      },
      {
        code: "MDA",
        name: "MDA-Metro Davao Area District",
        region_code: "EMR"
      },
      {
        code: "72",
        name: "72-San Francisco",
        region_code: "EMR"
      },
      {
        code: "89",
        name: "89-Tandag",
        region_code: "EMR"
      },
      {
        code: "77",
        name: "77-Davao City",
        region_code: "EMR"
      },
      {
        code: "78",
        name: "78-Nabunturan",
        region_code: "EMR"
      },
      {
        code: "82",
        name: "82-Tagum",
        region_code: "EMR"
      },
      {
        code: "83",
        name: "83-Mati",
        region_code: "EMR"
      },
      {
        code: "86",
        name: "86-Panabo",
        region_code: "EMR"
      },
      {
        code: "88",
        name: "88-Matina",
        region_code: "EMR"
      },
      {
        code: "78M",
        name: "78M-Monkayo BCO",
        region_code: "EMR"
      },
      {
        code: "92",
        name: "92-Toril",
        region_code: "EMR"
      },
      {
        code: "0H",
        name: "0H-Bislig",
        region_code: "EMR"
      },
      {
        code: "0C",
        name: "0C-Calinan",
        region_code: "EMR"
      },
      {
        code: "0CM",
        name: "0CM-Mintal BCO",
        region_code: "EMR"
      },
      {
        code: "72A",
        name: "72A-Barobo BCO",
        region_code: "EMR"
      },
      {
        code: "89C",
        name: "89C-Cantilan BCO",
        region_code: "EMR"
      },
      {
        code: "822",
        name: "822-Kapalong BCO",
        region_code: "EMR"
      },
      {
        code: "0L",
        name: "0L-Trento",
        region_code: "EMR"
      },
      {
        code: "921",
        name: "921-Samal BCO",
        region_code: "EMR"
      },
      {
        code: "1D",
        name: "1D-Buhangin",
        region_code: "EMR"
      },
      {
        code: "0V",
        name: "0V-Carmen",
        region_code: "EMR"
      },
      {
        code: "1E",
        name: "1E-Magugpo",
        region_code: "EMR"
      },
      {
        code: "1EP",
        name: "1EP-Pantukan BCO",
        region_code: "EMR"
      },
      {
        code: "83B",
        name: "83B-Baganga",
        region_code: "EMR"
      },
      {
        code: "1F",
        name: "1F-Lupon",
        region_code: "EMR"
      },
      {
        code: "05S",
        name: "05S-San Jose, N.Ecija",
        region_code: "NLR"
      },
      {
        code: "116011",
        name: "116011-San Ildefonso",
        region_code: "NLR"
      },
      {
        code: "1O",
        name: "1O-San Isidro",
        region_code: "SMR"
      },
      {
        code: "39",
        name: "39-Palawan",
        region_code: "GMA"
      },
      {
        code: "33G",
        name: "33G-Goa BCO",
        region_code: "SLR"
      },
      {
        code: "85T",
        name: "85T-Tulunan",
        region_code: "SMR"
      },
      {
        code: "SND",
        name: "SND-Sultan Kudarat - North Cotabato",
        region_code: "SMR"
      },
      {
        code: "0O",
        name: "0O-Lebak",
        region_code: "SMR"
      },
      {
        code: "0U",
        name: "0U-Mlang",
        region_code: "SMR"
      },
      {
        code: "1G",
        name: "1G-Kabacan",
        region_code: "SMR"
      },
      {
        code: "85",
        name: "85-Midsayap",
        region_code: "SMR"
      },
      {
        code: "85P",
        name: "85P-Pigcawayan",
        region_code: "SMR"
      },
      {
        code: "85T",
        name: "85T-Tulunan",
        region_code: "SMR"
      },
      {
        code: "0E",
        name: "0E-Isulan",
        region_code: "SMR"
      },
      {
        code: "81",
        name: "81-Tacurong",
        region_code: "SMR"
      },
      {
        code: "1BC",
        name: "1BC-Cadiz BCO",
        region_code: "WVR"
      },
      {
        code: "1U",
        name: "1U-Tagoloan",
        region_code: "NMR"
      },
      {
        code: "RFC360",
        name: "RFC 360",
        region_code: "GMA"
      },
      {
        code: "1V",
        name: "1V-Consolacion",
        region_code: "VRO"
      },
      {
        code: "46",
        name: "46-Meycauayan",
        region_code: "NLR"
      },
      {
        code: "39",
        name: "39-Palawan",
        region_code: "SLR"
      },
      {
        code: "NWD",
        name: "NWD-North West District",
        region_code: "NLR"
      },
      {
        code: "03",
        name: "03-Dagupan",
        region_code: "NLR"
      },
      {
        code: "03A",
        name: "03A-Alaminos BCO",
        region_code: "NLR"
      },
      {
        code: "15",
        name: "15-Pangasinan Area Office",
        region_code: "NLR"
      },
      {
        code: "08",
        name: "08-La Union",
        region_code: "NLR"
      },
      {
        code: "0R",
        name: "0R-La Trinidad, Benguet",
        region_code: "NLR"
      },
      {
        code: "0R2",
        name: "0R2-Abatan Buguias BCO",
        region_code: "NLR"
      },
      {
        code: "04",
        name: "04-Laoag",
        region_code: "NLR"
      },
      {
        code: "1A",
        name: "1A-Batac",
        region_code: "NLR"
      },
      {
        code: "14",
        name: "14-Vigan",
        region_code: "NLR"
      },
      {
        code: "113040",
        name: "113040-Candon",
        region_code: "NLR"
      },
      {
        code: "02",
        name: "02-Baguio",
        region_code: "NLR"
      },
      {
        code: "1W",
        name: "1W-Bayugan",
        region_code: "NMR"
      },
      {
        code: "2G",
        name: "2G-Barobo",
        region_code: "EMR"
      },
      {
        code: "1Y",
        name: "1Y-Molave",
        region_code: "NMR"
      },
      {
        code: "PAD",
        name: "PAD-Pangasinan Area District",
        region_code: "NLR"
      },
      {
        code: "NTD",
        name: "NTD-Nueva Ecija Tarlac District",
        region_code: "NLR"
      }
    ];

    await getRepository(Region).save(regionList);
    await getRepository(Branch).save(branchList);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
