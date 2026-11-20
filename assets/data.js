/* =====================================================================
   SITE CONTENT  (Baher Elsheikh engineering knowledge site)
   Edit this file only: every page, list, filter, count, search result
   and home-page section is built from it. Paths are from the site root.

   AREAS     : the six knowledge areas (id used in links: knowledge/#<id>)
   ARTICLES  : title, outlet ("" for this site), onsite (true = page here),
               date "YYYY-MM" (sorting), dateLabel (shown; "" hides it),
               area (AREAS id), summary, codes [list], url, featured (max 3
               on home), related (title of a TOOLS entry), image (optional,
               real photo or diagram), imageAlt, imageKind ("diagram" keeps
               the whole picture visible), lesson (optional: { type, note }
               lists the article under Lessons from the field because it
               contains a real case history)
               lesson types: "Failure Analysis", "Field Experience",
               "Troubleshooting", "Inspection Findings", "Lessons Learned"
   LESSONS   : dedicated case studies, same fields as ARTICLES plus
               lessonType (one of the lesson types). Empty until published.
   DOCUMENTS : title, desc, area, docType ("PDF guide", "Presentation",
               "Checklist", "Reference", ...), date "YYYY-MM", dateLabel,
               url (file in documents/files/ or an external link), size
               (e.g. "1.2 MB", optional). Empty until documents are added.
   NEWS      : headline, summary, date "YYYY-MM-DD", source (publisher),
               url (link to the original), topic (see NEWS_TOPICS).
               External news only; own opinions go in ARTICLES.
   TOOLS     : title, category, area, desc, codes (shown), codeList (for
               the standards index), url, status ("live" or "soon"),
               featured (shown on the home page)
   CODES     : one line describing each standard used in codeList / codes
   EDITIONS  : optional edition / year shown in the standards index,
               only where it is stated on the site (do not guess)
   ===================================================================== */
const AREAS = [
  { id: "static-equipment", name: "Static Equipment", icon: "vessel",
    desc: "Pressure vessels, heat exchangers, piping and bolted joints: design basis, mechanical details and the practical decisions behind them." },
  { id: "materials-and-metallurgy", name: "Materials and Metallurgy", icon: "grains",
    desc: "Material selection, cladding, hardness, microstructure and high-temperature damage such as stress relaxation cracking." },
  { id: "welding-and-repairs", name: "Welding and Fabrication", icon: "weld",
    desc: "Weld joints, weldability, post-weld heat treatment, mock-ups and repair methods for pressure equipment." },
  { id: "inspection-and-integrity", name: "Inspection and Asset Integrity", icon: "lens",
    desc: "Damage mechanisms, inspection planning, corrosion rates, remaining life and pressure testing safety." },
  { id: "fired-equipment", name: "Fired Heaters and Reformers", icon: "flame",
    desc: "Reformer catalyst tubes, furnaces and waste heat boilers working in the creep range." },
  { id: "codes-and-standards", name: "Codes and Standards", icon: "book",
    desc: "ASME, API, TEMA, WRC, NACE and ASTM requirements explained with engineering context." }
];

const ARTICLES = [
  { title: "Expanded Tube-to-Tubesheet Joints: Why the Groove Dimensions Aren't One-Size-Fits-All",
    outlet: "", onsite: true, date: "2026-11", dateLabel: "November 2026", area: "welding-and-repairs",
    summary: "Groove requirements for expanded tube-to-tubesheet joints to TEMA RCB-7.2.4: fixed grooves for roller expansion, a calculated width w = 1.56 √(R t) for hydraulic and explosive expansion with a table for common tube sizes, and grooves in the base metal of clad tubesheets.",
    codes: ["TEMA"], url: "articles/expanded-tube-to-tubesheet-joint-grooves/", featured: false, related: "Heat exchanger tube minimum thickness" },
  { title: "The Impact of Bolt Length on Mitigating Flange Leaks Under Transient Thermal Conditions",
    outlet: "", onsite: true, date: "2024-02", dateLabel: "February 2024", area: "static-equipment",
    summary: "How a longer effective bolt length makes a flanged joint more flexible, so that differential thermal expansion during thermal shock causes a smaller change in preload; bolt material, length allowances for tensioning, Belleville washers and extension collars.",
    codes: ["ASME PCC-1"], url: "articles/bolt-length-flange-leaks-thermal-transients/", featured: false, related: "Flange bolt torque" },
  { title: "Risk of Transient Conditions That Can Be Missed During Design and RBI",
    outlet: "", onsite: true, date: "2024-04", dateLabel: "April 2024", area: "inspection-and-integrity",
    summary: "Start-up, shutdown, steam-out, dry-out and other transient conditions that design and RBI can miss, with case histories of CUI in drain lines, SCC at reformer tube flanges and hydrogen embrittlement.",
    codes: [], url: "articles/transient-conditions-design-rbi/", featured: false, related: "Remaining life and inspection interval",
    image: "articles/transient-conditions-design-rbi/cover.jpg", imageAlt: "Process plant at dusk",
    lesson: { type: "Failure Analysis", note: "Three case histories: CUI in drain lines, stress corrosion cracking at reformer tube top flanges, and hydrogen embrittlement." } },
  { title: "Full Penetration Welds for Hydrogen Service",
    outlet: "", onsite: true, date: "2026-11", dateLabel: "November 2026", area: "welding-and-repairs",
    summary: "Why welded joints in hydrogen service should be full penetration, how diffused hydrogen builds up pressure in enclosed spaces, and the limits and venting of double-welded slip-on flanges.",
    codes: ["ASME B31.3", "ASME B31.12"], url: "articles/full-penetration-welds-hydrogen-service/", featured: false,
    image: "articles/full-penetration-welds-hydrogen-service/welding-in-hydrogen-service.png", imageAlt: "Welding in hydrogen service: recommended and not recommended joints", imageKind: "diagram" },
  { title: "Weld Buildup on Thinned Pressure Components: Weld the Perimeter First",
    outlet: "", onsite: true, date: "2026-11", dateLabel: "November 2026", area: "welding-and-repairs",
    summary: "Why ASME PCC-2 Article 202 has the first passes of an external weld buildup follow the outer perimeter of the area: a gauge for the welder and a tempered heat-affected zone in carbon and low-alloy steels.",
    codes: ["ASME PCC-2"], url: "articles/weld-buildup-sequence-pcc2/", featured: false },
  { title: "“Impractical” in the NBIC: A Technical Decision, Not a Shortcut",
    outlet: "", onsite: true, date: "2026-11", dateLabel: "November 2026", area: "codes-and-standards",
    summary: "What “impractical” and “not practicable” mean in the NBIC, with PWHT alternatives and tube plugging as examples, and why NB Interpretation 17-01 requires a technical basis rather than time or cost savings.",
    codes: ["NBIC"], url: "articles/impractical-term-nbic-repairs/", featured: false, related: "" },
  { title: "Charpy Impact Energy and Specimen Orientation in Rolled Plate",
    outlet: "", onsite: true, date: "2026-11", dateLabel: "November 2026", area: "materials-and-metallurgy",
    summary: "Why the same plate gives different Charpy results in the longitudinal, transverse and through-thickness directions (L > T > S), and what to state on purchase orders and test requests.",
    codes: ["ASTM A770", "EN 10164"], url: "articles/charpy-impact-energy-specimen-orientation/", featured: false,
    image: "articles/charpy-impact-energy-specimen-orientation/specimen-orientations.png", imageAlt: "Charpy specimen orientations in a rolled plate", imageKind: "diagram" },
  { title: "Common Mistakes That Can Be Avoided When Using Standards for Static Equipment",
    outlet: "", onsite: true, date: "", dateLabel: "", area: "codes-and-standards",
    summary: "Six mistakes that keep repeating with piping and flange standards: pipe schedules, inside diameter, weld neck bore, flange size limits, bolting strength, and B16.47 Series A and B.",
    codes: ["ASME B36.10M", "ASME B36.19M", "ASME B16.5", "ASME B16.47"], url: "articles/common-mistakes-using-standards-static-equipment/", featured: false },
  { title: "Copper Contamination Cracking of Austenitic Stainless Steels",
    outlet: "", onsite: true, date: "", dateLabel: "", area: "welding-and-repairs",
    summary: "How copper rubbed onto 304L or 316L causes liquid metal embrittlement and intergranular cracking in the weld heat-affected zone, and how to prevent and detect it.",
    codes: [], url: "articles/copper-contamination-cracking/", featured: false },
  { title: "Galling and Seizing of Stainless Steel Bolts",
    outlet: "", onsite: true, date: "", dateLabel: "", area: "materials-and-metallurgy",
    summary: "Why stainless steel bolts gall and seize, how dry friction raises the required torque by about 1.5 times compared with B7 bolts, and how to prevent galling.",
    codes: ["ASTM F1789", "ASME PCC-1", "VDI 2230-1"], url: "articles/galling-stainless-steel-bolts/", featured: false,
    related: "Flange bolt torque", image: "assets/thumbs/galling.jpg", imageAlt: "Stainless steel bolt damaged by galling" },
  { title: "Local PWHT for Pressure Vessels and Piping",
    outlet: "", onsite: true, date: "2025-03", dateLabel: "March 2025", area: "welding-and-repairs",
    summary: "Soak, heated and gradient control bands in local PWHT, how ASME, WRC 452, AWS D10.10, B31P and PD 5500 differ, Grade 91 filler limits, a worked example and a case history.",
    codes: ["WRC Bulletin 452", "ASME VIII-1", "ASME B31P", "AWS D10.10"], url: "articles/local-pwht-pressure-vessels/",
    featured: true, related: "Local PWHT heating bands",
    image: "assets/thumbs/local-pwht.png", imageAlt: "Soak, heated and gradient control bands around a circumferential weld", imageKind: "diagram",
    lesson: { type: "Field Experience", note: "Includes a case history of distortion after local PWHT." } },
  { title: "Stress Relaxation Cracking in Austenitic Alloys: Mechanism, Mitigation and ASME Code Considerations",
    outlet: "", onsite: true, date: "", dateLabel: "", area: "materials-and-metallurgy",
    summary: "How stress relaxation cracking develops in 347H and Alloy 800H, what ASME Sections I, II-D and VIII-1 and API TR 942-A/B require, and two case histories.",
    codes: ["ASME VIII-1", "ASME BPVC", "API 571", "API TR 942-B"], url: "articles/stress-relaxation-cracking-austenitic-alloys/",
    featured: false, image: "assets/thumbs/src.jpg", imageAlt: "Stress relaxation cracking at welded pads",
    lesson: { type: "Failure Analysis", note: "Two case histories of stress relaxation cracking in service." } },
  { title: "Achieving Leak-Free Flanged Joints Through Proper Application of Design Codes",
    outlet: "Inspectioneering Journal", date: "2024-05", dateLabel: "May/June 2024", area: "codes-and-standards",
    summary: "How flange design calculations connect to the bolt load specified at assembly, why that link is often missed despite ASME PCC-1, and how to close the gap, with case histories.",
    codes: ["ASME PCC-1"], url: "https://inspectioneering.com/journal/2024-06-27/11081/achieving-leak-free-flanged-joints-through-proper-application-of-design-codes",
    featured: true, related: "Flange bolt torque",
    lesson: { type: "Lessons Learned", note: "Case histories of flanged joint leaks traced to the assembly bolt load." } },
  { title: "Cladding Applications in Shell and Tube Heat Exchangers",
    outlet: "", onsite: true, date: "2024-03", dateLabel: "2024", area: "materials-and-metallurgy",
    summary: "Where cladding and weld overlay pay off, how clad plate is made, minimum clad thicknesses in API 660 and TEMA, hydrogen disbonding tests, and joint preparation for clad steel.",
    codes: ["API 660", "TEMA", "ASTM G146"], url: "articles/cladding-shell-and-tube-heat-exchangers/",
    featured: true, image: "assets/thumbs/cladding.jpg", imageAlt: "Explosion-clad plate for a heat exchanger" },
  { title: "Mock-up of Tube-to-Tubesheet Joints in Shell and Tube Heat Exchangers",
    outlet: "Heat Exchanger World", date: "2023-06", dateLabel: "2023", area: "welding-and-repairs",
    summary: "Why a mock-up should come before tube-to-tubesheet welding, what it must verify, and worked examples of the minimum leak path check against API 660.",
    codes: ["API 660"], url: "https://heat-exchanger-world.com/?p=66479", featured: false },
  { title: "Fluid Allocation in Shell and Tube Heat Exchangers",
    outlet: "", onsite: true, date: "2022-02", dateLabel: "February 2022", area: "static-equipment",
    summary: "Deciding which fluid goes on the tube side and which on the shell side: pressure drop, pressure and temperature, the 10/13 rule, fouling, corrosion, cooling water and exchanger type.",
    codes: ["API 521", "API 660", "TEMA", "ASME VIII-1"], url: "articles/fluid-allocation-shell-and-tube-heat-exchangers/", featured: false, image: "assets/thumbs/fluid-allocation.jpg", imageAlt: "Fouled tube bundle" },
  { title: "Collar Bolts in Shell and Tube Heat Exchangers",
    outlet: "Heat Exchanger World", date: "2020-05", dateLabel: "May 2020", area: "static-equipment",
    summary: "What collar bolts do in removable-bundle exchangers, what current specifications require, and the pros and cons of using them.",
    codes: ["TEMA", "PIP VEFV1100M"], url: "https://heat-exchanger-world.com/?p=63904", featured: false },
  { title: "Effective Reliability and Safety Management of Steam Reformer Tubes",
    outlet: "Inspectioneering Journal", date: "2020-03", dateLabel: "March/April 2020", area: "fired-equipment",
    summary: "A complete integrity programme for catalyst tubes: damage mechanisms, inspection, tube metal temperature measurement, process monitoring, early leak detection, remaining life and human factors.",
    codes: [], url: "https://inspectioneering.com/journal/2020-04-30/9162/effective-reliability-and-safety-management-of-steam-reformer-tubes",
    featured: false },
  { title: "Design and Inspection of Injection and Mixing Points in Process Plants",
    outlet: "", onsite: true, date: "2020-02", dateLabel: "2020", area: "inspection-and-integrity",
    summary: "Why injection and mixing points corrode faster than the main line, and the design, material, device, operating and inspection practices that control the risk.",
    codes: ["NACE SP0114", "API 570", "API 571", "ASTM F1545"], url: "articles/injection-and-mixing-points/", featured: false, image: "assets/thumbs/injection.png", imageAlt: "Thermal sleeves at an injection point", imageKind: "diagram" }
];

const LESSONS = [];

/* Example entry (PDF placed in website/documents/files/):
  { title: "Local PWHT Checklist", desc: "One-page checklist for planning local PWHT of pressure vessel and piping welds.",
    area: "welding-and-repairs", docType: "Checklist", date: "2026-11", dateLabel: "November 2026",
    url: "documents/files/local-pwht-checklist.pdf", size: "0.4 MB", codes: ["WRC Bulletin 452"] },
*/
const DOCUMENTS = [
  { title: "Materials Selection for Pressure Equipment",
    desc: "Static Equipment Awareness Series, Part 3: selection alternatives and workflow, temperature and corrosion limits, materials selection diagrams and the selection report; strength, toughness and other key properties; carbon and Cr-Mo steels, stainless steel families and nickel alloys, where each is used; and industrial challenges such as PWHT, dissimilar metal welds and contamination. 80 slides.",
    area: "materials-and-metallurgy", docType: "Presentation", date: "2026-11", dateLabel: "November 2026",
    url: "documents/files/materials-selection.pdf", size: "6.8 MB", codes: ["ASME BPVC", "API 571"],
    image: "documents/covers/materials-selection.jpg", imageAlt: "Cover slide: Materials Selection" },
  { title: "Stress Relaxation Cracking in Austenitic Materials",
    desc: "Mechanism, other names and morphology of stress relaxation cracking, the critical factors, a review of ASME BPVC Sections I, II and VIII, API RP 571 and API TR 942-A/B, case histories of an Alloy 800H reformer riser and SS 347H reformer inlet piping, and mitigation. 18 slides.",
    area: "materials-and-metallurgy", docType: "Presentation", date: "2026-05", dateLabel: "May 2026",
    url: "documents/files/stress-relaxation-cracking.pdf", size: "0.9 MB", codes: ["ASME BPVC", "API 571", "API TR 942-B"],
    image: "documents/covers/stress-relaxation-cracking.jpg", imageAlt: "Cover slide: Stress Relaxation Cracking in Austenitic Materials" },
  { title: "Tube-to-Tubesheet Joints",
    desc: "Expanded, strength-welded and seal-welded joints and how to choose between them; tube holes, expansion methods, weld configurations, cladding, mock-ups and minimum leak path; common defects; inspection and repair; and four case histories from ammonia, urea and process gas services. 52 slides.",
    area: "welding-and-repairs", docType: "Presentation", date: "2022-09", dateLabel: "September 2022",
    url: "documents/files/tube-to-tubesheet-joints.pdf", size: "4.0 MB", codes: ["API 660", "TEMA", "ASME VIII-1"],
    image: "documents/covers/tube-to-tubesheet-joints.jpg", imageAlt: "Cover slide: Tube-to-Tubesheet Joints" },
  { title: "Mechanical Clamp Design: Simplified Method",
    desc: "A simplified method for sizing the shell, end plates, lugs and bolts of a leak-sealing clamp to ASME Section VIII Division 1, with the input data and design equations. Companion to the bolted clamp calculator. 11 slides.",
    area: "welding-and-repairs", docType: "Presentation", date: "2022-04", dateLabel: "April 2022",
    url: "documents/files/mechanical-clamp-design.pdf", size: "2.3 MB", codes: ["ASME VIII-1", "ASME PCC-2"],
    image: "documents/covers/mechanical-clamp-design.jpg", imageAlt: "Cover slide: Mechanical Clamp Design" }
];

const NEWS_TOPICS = ["Codes and standards updates", "Materials and welding", "Inspection and asset integrity", "Incidents and failures", "Industry developments"];
const NEWS = [
  { headline: "CSB final report: furnace explosion and fire at Shell Polymers Monaca",
    summary: "The CSB released its final report on the June 2025 explosion in an ethane cracking furnace in Pennsylvania (about $95 million damage). It recommends replacing administrative-only safeguards with inherently safer design or engineered controls, and an engineered control to prevent cracked gas flowing back into a furnace in all operating modes.",
    date: "2026-09-16", source: "U.S. Chemical Safety Board (CSB)", url: "https://www.csb.gov/shell-polymers-monaca-chemical-release-/", topic: "Incidents and failures" },
  { headline: "CSB final report: ethylene oxide explosions at Dow Plaquemine traced to a punctured rupture disc",
    summary: "Debris from work lights left in a reflux drum during maintenance punctured a rupture disc, letting ethylene oxide into relief piping where the nitrogen blanket had leaked away and been replaced by air. The report also points to vessel closure practice and a relief system that discharged back into the drum. More than 31,000 lb of ethylene oxide were released.",
    date: "2026-02-26", source: "U.S. Chemical Safety Board (CSB)", url: "https://www.csb.gov/us-chemical-safety-board-releases-investigation-report-on-the-2023-explosion-and-toxic-ethylene-oxide-release-at-dow-plant-in-plaquemine-louisiana/", topic: "Incidents and failures" },
  { headline: "CSB final report: wrong flange opened in H2S service at PEMEX Deer Park, two fatalities",
    summary: "Contract workers opened a flange on pressurised hydrogen sulfide piping about five feet from the one they intended to open. The CSB found no reliable way to identify the correct flange, a broad work permit covering several jobs, and procedures that did not match practice. It asks ASME to develop guidelines for marking equipment before it is opened.",
    date: "2026-02-23", source: "U.S. Chemical Safety Board (CSB)", url: "https://www.csb.gov/us-chemical-safety-board-releases-investigation-report-on-fatal-hydrogen-sulfide-release-at-the-pemex-deer-park-refinery-in-texas/", topic: "Incidents and failures" },
  { headline: "2025 edition of the ASME Boiler and Pressure Vessel Code published",
    summary: "ASME has issued the 2025 edition of the BPVC. Section VIII Division 2 has its largest revision since the 2007 rewrite, and Mandatory Appendix 47 of Division 1 on designer responsibilities has been rewritten. Check the edition required by your jurisdiction and contracts before applying the new rules.",
    date: "2025-07-01", source: "ASME", url: "https://www.asme.org/codes-standards/bpvc-standards/bpvc-2025", topic: "Codes and standards updates" },
  { headline: "ASME B31.3-2024 Process Piping: summary of the main changes",
    summary: "The 2024 edition of B31.3 aligns the allowable stress basis for high-pressure piping (Chapter IX) with Section VIII Division 3 and revises the lower temperature limits for ASTM A105 flanges in para. F323.2.2. Summary by Becht.",
    date: "2024-12-27", source: "Becht", url: "https://becht.com/becht-blog/entry/asme-b31-3-process-piping-changes-in-the-2024-edition/", topic: "Codes and standards updates" }
];

const TOOLS = [
  { title: "Heat exchanger tube minimum thickness", category: "Heat exchangers", area: "static-equipment",
    desc: "Required tube wall for internal and external pressure, U-bend thinning and tube-side hydrotest, with a wall-thickness gauge.",
    codes: "ASME VIII-1 UG-27, UG-28, UG-99; TEMA RCB-2.31", codeList: ["ASME VIII-1", "TEMA"],
    url: "https://baher-elsheikh.github.io/Tube-Thickness-Calculator/", status: "live", featured: true },
  { title: "Cylindrical shell thickness", category: "Pressure vessels", area: "static-equipment",
    desc: "Required thickness, MAWP and MAP new and cold, external pressure, forming strain, hydrotest pressure and MDMT for cylindrical shells.",
    codes: "ASME VIII-1 UG-16, UG-27, UG-28, UG-79, UG-99, UCS-66", codeList: ["ASME VIII-1"], url: "calculators/cylindrical-shell/", status: "live", featured: true },
  { title: "Pipe wall thickness (ASME B31.3)", category: "Piping", area: "static-equipment",
    desc: "Pressure design thickness, allowances and mill tolerance, schedule selection from ASME B36.10M, MAWP and hydrotest pressure for process piping.",
    codes: "ASME B31.3 304.1.2, 345.4.2; ASME B36.10M", codeList: ["ASME B31.3", "ASME B36.10M"], url: "calculators/pipe-thickness-b31-3/", status: "live", featured: true },
  { title: "Pressure relief valve sizing", category: "Pressure relief", area: "static-equipment",
    desc: "Required orifice area for gas (critical flow) and non-flashing liquid relief, API 526 orifice selection and rated capacity, in USC or SI units.",
    codes: "API 520 Part I, API 526, ASME BPVC Section XIII", codeList: ["API 520", "API 526", "ASME BPVC"], url: "calculators/prv-sizing/", status: "live", featured: true },
  { title: "Formed heads (ellipsoidal, hemispherical, torispherical)", category: "Pressure vessels", area: "static-equipment",
    desc: "Required thickness after forming, MAWP and hydrotest pressure of ellipsoidal, hemispherical and torispherical heads under internal and external pressure.",
    codes: "ASME VIII-1 UG-32, UG-33, App. 1-4, UG-99", codeList: ["ASME VIII-1"], url: "calculators/formed-heads/", status: "live", featured: false },
  { title: "Bolted clamp", category: "Repairs", area: "welding-and-repairs",
    desc: "Shell, end plate and lug thickness, required and available bolt load, and bolt tightening for non-structural leak-sealing clamps.",
    codes: "ASME VIII-1 UG-27, UG-34, App. 2, App. Y; ASME PCC-1; ASME PCC-2", codeList: ["ASME VIII-1", "ASME PCC-1", "ASME PCC-2"], url: "calculators/bolted-clamp/", status: "live", featured: true },
  { title: "Flange bolt torque", category: "Bolted joints", area: "static-equipment",
    desc: "Target assembly bolt stress checked against bolt, gasket and flange limits, then the tightening torque and passes, for inch and metric bolts.",
    codes: "ASME PCC-1 Appendix O, Appendix H", codeList: ["ASME PCC-1"], url: "calculators/flange-bolt-torque/", status: "live", featured: false },
  { title: "Non-standard flange (Appendix 2)", category: "Bolted joints", area: "static-equipment",
    desc: "Bolt loads, moments, flange factors by equation, stresses and rigidity for integral, loose and ring flanges, with a WRC 538 check at the assembly bolt stress.",
    codes: "ASME VIII-1 Mandatory Appendix 2; WRC Bulletin 538", codeList: ["ASME VIII-1", "WRC Bulletin 538"], url: "calculators/non-standard-flange/", status: "live", featured: false },
  { title: "Flange external loads (UG-44(b), Code Case 2901-1)", category: "Bolted joints", area: "static-equipment",
    desc: "External moment and axial force on standard welding neck flanges by the equivalent pressure method, with the Code Case 2901-1 option and the maximum allowable loads.",
    codes: "ASME VIII-1 UG-44(b); Code Case 2901-1", codeList: ["ASME VIII-1"], url: "calculators/flange-external-loads/", status: "live", featured: false },
  { title: "Welded tube plug", category: "Heat exchangers", area: "welding-and-repairs",
    desc: "Plug thickness for tube and shell side pressure, plug height, fillet weld shear and leg size, and hydrotest checks for welded tube plugs.",
    codes: "ASME VIII-1 UG-34, UW-18, UG-99", codeList: ["ASME VIII-1"], url: "calculators/welded-tube-plug/", status: "live", featured: false },
  { title: "Local PWHT heating bands", category: "Welding and PWHT", area: "welding-and-repairs",
    desc: "Soak band, heated band and gradient control band widths for local post-weld heat treatment, compared with PD 5500, plus UCS-56 holding time and rates for P-No. 1.",
    codes: "WRC Bulletin 452; AWS D10.10; ASME VIII-1 UW-40, UCS-56", codeList: ["WRC Bulletin 452", "AWS D10.10", "ASME VIII-1"], url: "calculators/local-pwht-bands/", status: "live", featured: false },
  { title: "Weld metal ferrite (Schaeffler, DeLong, WRC-1992)", category: "Welding and PWHT", area: "welding-and-repairs",
    desc: "Interactive constitution diagrams: two base metals, filler and dilution by process, with the weld metal structure, Ferrite Number and solidification mode.",
    codes: "Schaeffler 1949; DeLong 1974; WRC-1992 (ASME III, AWS)", codeList: [], url: "calculators/weld-metal-ferrite/", status: "live", featured: true },
  { title: "Pneumatic test safe distance", category: "Pressure testing", area: "inspection-and-integrity",
    desc: "Stored energy, TNT equivalent, blast wave and fragment throw distances, and the exclusion zone for pneumatic pressure tests.",
    codes: "ASME PCC-2 Mandatory Appendices 501-II, 501-III", codeList: ["ASME PCC-2"], url: "calculators/pneumatic-test-distance/", status: "live", featured: false },
  { title: "Remaining life and inspection interval", category: "Inspection", area: "inspection-and-integrity",
    desc: "Long-term and short-term corrosion rates, remaining life, retirement date, next inspection interval and MAWP at the next inspection for vessels and piping.",
    codes: "API 510; API 570; ASME VIII-1 UG-27; ASME B31.3", codeList: ["API 510", "API 570"], url: "calculators/remaining-life/", status: "live", featured: true }
];

const CODES = {
  "ASME VIII-1": "BPVC Section VIII, Division 1: rules for construction of pressure vessels",
  "ASME PCC-1": "Guidelines for pressure boundary bolted flange joint assembly",
  "ASME PCC-2": "Repair of pressure equipment and piping",
  "ASME BPVC": "Boiler and Pressure Vessel Code",
  "API 520": "Sizing, selection and installation of pressure-relieving devices",
  "API 521": "Pressure-relieving and depressuring systems",
  "API 526": "Flanged steel pressure-relief valves",
  "ASME B31.3": "Process piping",
  "ASME B31.12": "Hydrogen piping and pipelines",
  "ASME B31P": "Standard heat treatments for piping",
  "AWS D10.10": "Recommended practices for local heating of welds in piping and tubing",
  "API TR 942-B": "Austenitic alloys subject to embrittlement and cracking in high-temperature refinery service",
  "API 510": "Pressure vessel inspection code: in-service inspection, rating, repair and alteration",
  "API 570": "Piping inspection code: in-service inspection, repair and alteration",
  "API 571": "Damage mechanisms affecting fixed equipment in the refining industry",
  "API 660": "Shell-and-tube heat exchangers",
  "TEMA": "Standards of the Tubular Exchanger Manufacturers Association",
  "WRC Bulletin 452": "Recommended practices for local heating of welds in pressure vessels",
  "WRC Bulletin 538": "Determination of pressure boundary joint assembly bolt loads",
  "NACE SP0114": "Refinery injection and process mix points",
  "ASTM F1545": "Plastic-lined ferrous metal pipe, fittings and flanges",
  "ASTM G146": "Disbonding of bimetallic stainless alloy/steel plate in refinery hydrogen service",
  "PIP VEFV1100M": "Vessel and shell-and-tube exchanger standard details",
  "ASTM F1789": "Standard terminology for mechanical fasteners",
  "VDI 2230-1": "Systematic calculation of highly stressed bolted joints",
  "ASME B36.10M": "Welded and seamless wrought steel pipe",
  "ASME B36.19M": "Stainless steel pipe",
  "ASME B16.5": "Pipe flanges and flanged fittings, NPS 1/2 through NPS 24",
  "ASME B16.47": "Large diameter steel flanges, NPS 26 through NPS 60",
  "ASTM A370": "Test methods and definitions for mechanical testing of steel products",
  "NBIC": "National Board Inspection Code (ANSI/NB-23): installation, inspection, repair and alteration of pressure-retaining items",
  "ASTM A770": "Through-thickness tension testing of steel plates for special applications",
  "EN 10164": "Steel products with improved deformation properties perpendicular to the surface (Z-grades)",
  "ASTM E140": "Hardness conversion tables for metals"
};

const EDITIONS = {
  "ASME PCC-2": "2022 (pneumatic test calculator)",
  "ASTM A370": "A370-26 (hardness conversion calculator)",
  "ASTM E140": "E140-12b(2019)e1 (hardness conversion calculator)"
};
