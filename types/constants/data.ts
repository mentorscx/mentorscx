import { Options } from "react-select";

export interface timeZone {
  readonly value: string;
  readonly label: string;
  readonly color?: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

export const TIMEZONES: readonly timeZone[] = [
  { value: "-12:00", label: "(GMT -12:00) Eniwetok, Kwajalein" },
  { value: "-11:00", label: "(GMT -11:00) Midway Island, Samoa" },
  { value: "-10:00", label: "(GMT -10:00) Hawaii" },
  { value: "-09:50", label: "(GMT -9:30) Taiohae" },
  { value: "-09:00", label: "(GMT -9:00) Alaska" },
  { value: "-08:00", label: "(GMT -8:00) Pacific Time (US & Canada)" },
  { value: "-07:00", label: "(GMT -7:00) Mountain Time (US & Canada)" },
  {
    value: "-06:00",
    label: "(GMT -6:00) Central Time (US & Canada), Mexico City",
  },
  {
    value: "-05:00",
    label: "(GMT -5:00) Eastern Time (US & Canada), Bogota, Lima",
  },
  { value: "-04:50", label: "(GMT -4:30) Caracas" },
  {
    value: "-04:00",
    label: "(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz",
  },
  { value: "-03:50", label: "(GMT -3:30) Newfoundland" },
  { value: "-03:00", label: "(GMT -3:00) Brazil, Buenos Aires, Georgetown" },
  { value: "-02:00", label: "(GMT -2:00) Mid-Atlantic" },
  { value: "-01:00", label: "(GMT -1:00) Azores, Cape Verde Islands" },
  {
    value: "+00:00",
    label: "(GMT) Western Europe Time, London, Lisbon, Casablanca",
  },
  { value: "+01:00", label: "(GMT +1:00) Brussels, Copenhagen, Madrid, Paris" },
  { value: "+02:00", label: "(GMT +2:00) Kaliningrad, South Africa" },
  {
    value: "+03:00",
    label: "(GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg",
  },
  { value: "+03:50", label: "(GMT +3:30) Tehran" },
  { value: "+04:00", label: "(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi" },
  { value: "+04:50", label: "(GMT +4:30) Kabul" },
  {
    value: "+05:00",
    label: "(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent",
  },
  { value: "+05:50", label: "(GMT +5:30) Bombay, Calcutta, Madras, New Delhi" },
  { value: "+05:75", label: "(GMT +5:45) Kathmandu, Pokhara" },
  { value: "+06:00", label: "(GMT +6:00) Almaty, Dhaka, Colombo" },
  { value: "+06:50", label: "(GMT +6:30) Yangon, Mandalay" },
  { value: "+07:00", label: "(GMT +7:00) Bangkok, Hanoi, Jakarta" },
  {
    value: "+08:00",
    label: "(GMT +8:00) Beijing, Perth, Singapore, Hong Kong",
  },
  { value: "+08:75", label: "(GMT +8:45) Eucla" },
  {
    value: "+09:00",
    label: "(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk",
  },
  { value: "+09:50", label: "(GMT +9:30) Adelaide, Darwin" },
  {
    value: "+10:00",
    label: "(GMT +10:00) Eastern Australia, Guam, Vladivostok",
  },
  { value: "+10:50", label: "(GMT +10:30) Lord Howe Island" },
  {
    value: "+11:00",
    label: "(GMT +11:00) Magadan, Solomon Islands, New Caledonia",
  },
  { value: "+11:50", label: "(GMT +11:30) Norfolk Island" },
  {
    value: "+12:00",
    label: "(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka",
  },
  { value: "+12:75", label: "(GMT +12:45) Chatham Islands" },
  { value: "+13:00", label: "(GMT +13:00) Apia, Nukualofa" },
  { value: "+14:00", label: "(GMT +14:00) Line Islands, Tokelau" },
];

export interface language {
  readonly value: string;
  readonly label: string;
  readonly color?: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

export const LANGUAGES: readonly language[] = [
  { value: "Afrikaans", label: "Afrikaans" },
  { value: "Albanian", label: "Albanian" },
  { value: "Amharic", label: "Amharic" },
  { value: "Arabic", label: "Arabic" },
  { value: "Armenian", label: "Armenian" },
  { value: "Assamese", label: "Assamese" },
  { value: "Aymara", label: "Aymara" },
  { value: "Azerbaijani", label: "Azerbaijani" },
  { value: "Bambara", label: "Bambara" },
  { value: "Basque", label: "Basque" },
  { value: "be", label: "Belarusian" },
  { value: "bn", label: "Bengali" },
  { value: "bho", label: "Bhojpuri" },
  { value: "bs", label: "Bosnian" },
  { value: "bg", label: "Bulgarian" },
  { value: "ca", label: "Catalan" },
  { value: "ceb", label: "Cebuano" },
  { value: "zh", label: "Chinese (Simplified)" },
  { value: "zh-TW", label: "Chinese (Traditional)" },
  { value: "co", label: "Corsican" },
  { value: "hr", label: "Croatian" },
  { value: "cs", label: "Czech" },
  { value: "da", label: "Danish" },
  { value: "dv", label: "Dhivehi" },
  { value: "doi", label: "Dogri" },
  { value: "nl", label: "Dutch" },
  { value: "en", label: "English" },
  { value: "eo", label: "Esperanto" },
  { value: "et", label: "Estonian" },
  { value: "ee", label: "Ewe" },
  { value: "tl", label: "Filipino (Tagalog)" },
  { value: "fi", label: "Finnish" },
  { value: "fr", label: "French" },
  { value: "fy", label: "Frisian" },
  { value: "gl", label: "Galician" },
  { value: "ka", label: "Georgian" },
  { value: "de", label: "German" },
  { value: "el", label: "Greek" },
  { value: "gn", label: "Guarani" },
  { value: "gu", label: "Gujarati" },
  { value: "ht", label: "Haitian Creole" },
  { value: "ha", label: "Hausa" },
  { value: "haw", label: "Hawaiian" },
  { value: "he", label: "Hebrew" },
  { value: "hi", label: "Hindi" },
  { value: "hmn", label: "Hmong" },
  { value: "hu", label: "Hungarian" },
  { value: "is", label: "Icelandic" },
  { value: "ig", label: "Igbo" },
  { value: "ilo", label: "Ilocano" },
  { value: "id", label: "Indonesian" },
  { value: "ga", label: "Irish" },
  { value: "it", label: "Italian" },
  { value: "ja", label: "Japanese" },
  { value: "jv", label: "Javanese" },
  { value: "kn", label: "Kannada" },
  { value: "kk", label: "Kazakh" },
  { value: "km", label: "Khmer" },
  { value: "rw", label: "Kinyarwanda" },
  { value: "kok", label: "Konkani" },
  { value: "ko", label: "Korean" },
  { value: "kri", label: "Krio" },
  { value: "ku", label: "Kurdish" },
  { value: "ckb", label: "Kurdish (Sorani)" },
  { value: "ky", label: "Kyrgyz" },
  { value: "lo", label: "Lao" },
  { value: "la", label: "Latin" },
  { value: "lv", label: "Latvian" },
  { value: "ln", label: "Lingala" },
  { value: "lt", label: "Lithuanian" },
  { value: "lg", label: "Luganda" },
  { value: "lb", label: "Luxembourgish" },
  { value: "mk", label: "Macedonian" },
  { value: "mai", label: "Maithili" },
  { value: "mg", label: "Malagasy" },
  { value: "ms", label: "Malay" },
  { value: "ml", label: "Malayalam" },
  { value: "mt", label: "Maltese" },
  { value: "mi", label: "Maori" },
  { value: "mr", label: "Marathi" },
  { value: "mni", label: "Meiteilon (Manipuri)" },
  { value: "lus", label: "Mizo" },
  { value: "mn", label: "Mongolian" },
  { value: "my", label: "Myanmar (Burmese)" },
  { value: "ne", label: "Nepali" },
  { value: "no", label: "Norwegian" },
  { value: "ny", label: "Nyanja (Chichewa)" },
  { value: "or", label: "Odia (Oriya)" },
  { value: "om", label: "Oromo" },
  { value: "ps", label: "Pashto" },
  { value: "fa", label: "Persian" },
  { value: "pl", label: "Polish" },
  { value: "pt", label: "Portuguese (Portugal, Brazil)" },
  { value: "pa", label: "Punjabi" },
  { value: "qu", label: "Quechua" },
  { value: "ro", label: "Romanian" },
  { value: "ru", label: "Russian" },
  { value: "sm", label: "Samoan" },
  { value: "sa", label: "Sanskrit" },
  { value: "gd", label: "Scots Gaelic" },
  { value: "nso", label: "Sepedi" },
  { value: "sr", label: "Serbian" },
  { value: "st", label: "Sesotho" },
  { value: "sn", label: "Shona" },
  { value: "sd", label: "Sindhi" },
  { value: "si", label: "Sinhala (Sinhalese)" },
  { value: "sk", label: "Slovak" },
  { value: "sl", label: "Slovenian" },
  { value: "so", label: "Somali" },
  { value: "es", label: "Spanish" },
  { value: "su", label: "Sundanese" },
  { value: "sw", label: "Swahili" },
  { value: "sv", label: "Swedish" },
  { value: "tl", label: "Tagalog (Filipino)" },
  { value: "tg", label: "Tajik" },
  { value: "ta", label: "Tamil" },
  { value: "tt", label: "Tatar" },
  { value: "te", label: "Telugu" },
  { value: "th", label: "Thai" },
  { value: "ti", label: "Tigrinya" },
  { value: "ts", label: "Tsonga" },
  { value: "tr", label: "Turkish" },
  { value: "tk", label: "Turkmen" },
  { value: "tw", label: "Twi (Akan)" },
  { value: "uk", label: "Ukrainian" },
  { value: "ur", label: "Urdu" },
  { value: "ug", label: "Uyghur" },
  { value: "uz", label: "Uzbek" },
  { value: "vi", label: "Vietnamese" },
  { value: "cy", label: "Welsh" },
  { value: "xh", label: "Xhosa" },
  { value: "yi", label: "Yiddish" },
  { value: "yo", label: "Yoruba" },
  { value: "zu", label: "Zulu" },
];

export interface country {
  readonly value: string;
  readonly label: string;
  readonly color?: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

export const COUNTRIES: readonly country[] = [
  { value: "Afghanistan", label: "Afghanistan" },
  { value: "Albania", label: "Albania" },
  { value: "Algeria", label: "Algeria" },
  { value: "Andorra", label: "Andorra" },
  { value: "Angola", label: "Angola" },
  { value: "Antigua and Barbuda", label: "Antigua and Barbuda" },
  { value: "Argentina", label: "Argentina" },
  { value: "Armenia", label: "Armenia" },
  { value: "Australia", label: "Australia" },
  { value: "Austria", label: "Austria" },
  { value: "Azerbaijan", label: "Azerbaijan" },
  { value: "Bahamas", label: "Bahamas" },
  { value: "Bahrain", label: "Bahrain" },
  { value: "Bangladesh", label: "Bangladesh" },
  { value: "Barbados", label: "Barbados" },
  { value: "Belarus", label: "Belarus" },
  { value: "Belgium", label: "Belgium" },
  { value: "Belize", label: "Belize" },
  { value: "Benin", label: "Benin" },
  { value: "Bhutan", label: "Bhutan" },
  // Continuation of the list
  { value: "Bolivia", label: "Bolivia" },
  { value: "Bosnia and Herzegovina", label: "Bosnia and Herzegovina" },
  { value: "Botswana", label: "Botswana" },
  { value: "Brazil", label: "Brazil" },
  { value: "Brunei", label: "Brunei" },
  { value: "Bulgaria", label: "Bulgaria" },
  { value: "Burkina Faso", label: "Burkina Faso" },
  { value: "Burundi", label: "Burundi" },
  { value: "Cabo Verde", label: "Cabo Verde" },
  { value: "Cambodia", label: "Cambodia" },
  { value: "Cameroon", label: "Cameroon" },
  { value: "Canada", label: "Canada" },
  { value: "Central African Republic", label: "Central African Republic" },
  { value: "Chad", label: "Chad" },
  { value: "Chile", label: "Chile" },
  { value: "China", label: "China" },
  { value: "Colombia", label: "Colombia" },
  { value: "Comoros", label: "Comoros" },
  { value: "Congo (Congo-Brazzaville)", label: "Congo (Congo-Brazzaville)" },
  { value: "Costa Rica", label: "Costa Rica" },
  { value: "Croatia", label: "Croatia" },
  { value: "Cuba", label: "Cuba" },
  { value: "Cyprus", label: "Cyprus" },
  { value: "Czechia (Czech Republic)", label: "Czechia (Czech Republic)" },
  { value: "Denmark", label: "Denmark" },
  { value: "Djibouti", label: "Djibouti" },
  { value: "Dominica", label: "Dominica" },
  { value: "Dominican Republic", label: "Dominican Republic" },
  { value: "Ecuador", label: "Ecuador" },
  { value: "Egypt", label: "Egypt" },
  { value: "El Salvador", label: "El Salvador" },
  { value: "Equatorial Guinea", label: "Equatorial Guinea" },
  { value: "Eritrea", label: "Eritrea" },
  { value: "Estonia", label: "Estonia" },
  { value: "Eswatini", label: "Eswatini" },
  { value: "Ethiopia", label: "Ethiopia" },
  { value: "Fiji", label: "Fiji" },
  { value: "Finland", label: "Finland" },
  { value: "France", label: "France" },
  { value: "Gabon", label: "Gabon" },
  { value: "Gambia", label: "Gambia" },
  { value: "Georgia", label: "Georgia" },
  { value: "Germany", label: "Germany" },
  { value: "Ghana", label: "Ghana" },
  { value: "Greece", label: "Greece" },
  { value: "Grenada", label: "Grenada" },
  { value: "Guatemala", label: "Guatemala" },
  { value: "Guinea", label: "Guinea" },
  { value: "Guinea-Bissau", label: "Guinea-Bissau" },
  { value: "Guyana", label: "Guyana" },
  { value: "Haiti", label: "Haiti" },
  { value: "Honduras", label: "Honduras" },
  { value: "Hungary", label: "Hungary" },
  { value: "Iceland", label: "Iceland" },
  { value: "India", label: "India" },
  { value: "Indonesia", label: "Indonesia" },
  { value: "Iran", label: "Iran" },
  { value: "Iraq", label: "Iraq" },
  { value: "Ireland", label: "Ireland" },
  { value: "Israel", label: "Israel" },
  { value: "Italy", label: "Italy" },
  { value: "Jamaica", label: "Jamaica" },
  { value: "Japan", label: "Japan" },
  { value: "Jordan", label: "Jordan" },
  { value: "Kazakhstan", label: "Kazakhstan" },
  { value: "Kenya", label: "Kenya" },
  { value: "Kiribati", label: "Kiribati" },
  { value: "Kosovo", label: "Kosovo" },
  { value: "Kuwait", label: "Kuwait" },
  { value: "Kyrgyzstan", label: "Kyrgyzstan" },
  { value: "Laos", label: "Laos" },
  { value: "Latvia", label: "Latvia" },
  { value: "Lebanon", label: "Lebanon" },
  { value: "Lesotho", label: "Lesotho" },
  { value: "Liberia", label: "Liberia" },
  { value: "Libya", label: "Libya" },
  { value: "Liechtenstein", label: "Liechtenstein" },
  { value: "Lithuania", label: "Lithuania" },
  { value: "Luxembourg", label: "Luxembourg" },
  { value: "Madagascar", label: "Madagascar" },
  { value: "Malawi", label: "Malawi" },
  { value: "Malaysia", label: "Malaysia" },
  { value: "Maldives", label: "Maldives" },
  { value: "Mali", label: "Mali" },
  { value: "Malta", label: "Malta" },
  { value: "Marshall Islands", label: "Marshall Islands" },
  { value: "Mauritania", label: "Mauritania" },
  { value: "Mauritius", label: "Mauritius" },
  { value: "Mexico", label: "Mexico" },
  { value: "Micronesia", label: "Micronesia" },
  { value: "Moldova", label: "Moldova" },
  { value: "Monaco", label: "Monaco" },
  { value: "Mongolia", label: "Mongolia" },
  { value: "Montenegro", label: "Montenegro" },
  { value: "Morocco", label: "Morocco" },
  { value: "Mozambique", label: "Mozambique" },
  { value: "Myanmar (formerly Burma)", label: "Myanmar (formerly Burma)" },
  { value: "Namibia", label: "Namibia" },
  { value: "Nauru", label: "Nauru" },
  { value: "Nepal", label: "Nepal" },
  { value: "Netherlands", label: "Netherlands" },
  { value: "New Zealand", label: "New Zealand" },
  { value: "Nicaragua", label: "Nicaragua" },
  { value: "Niger", label: "Niger" },
  { value: "Nigeria", label: "Nigeria" },
  { value: "North Korea", label: "North Korea" },
  { value: "North Macedonia", label: "North Macedonia" },
  { value: "Norway", label: "Norway" },
  { value: "Oman", label: "Oman" },
  { value: "Pakistan", label: "Pakistan" },
  { value: "Palau", label: "Palau" },
  { value: "Palestine State", label: "Palestine State" },
  { value: "Panama", label: "Panama" },
  { value: "Papua New Guinea", label: "Papua New Guinea" },
  { value: "Paraguay", label: "Paraguay" },
  { value: "Peru", label: "Peru" },
  { value: "Philippines", label: "Philippines" },
  { value: "Poland", label: "Poland" },
  { value: "Portugal", label: "Portugal" },
  { value: "Qatar", label: "Qatar" },
  { value: "Romania", label: "Romania" },
  { value: "Russia", label: "Russia" },
  { value: "Rwanda", label: "Rwanda" },
  { value: "Saint Kitts and Nevis", label: "Saint Kitts and Nevis" },
  { value: "Saint Lucia", label: "Saint Lucia" },
  {
    value: "Saint Vincent and the Grenadines",
    label: "Saint Vincent and the Grenadines",
  },
  { value: "Samoa", label: "Samoa" },
  { value: "San Marino", label: "San Marino" },
  { value: "Sao Tome and Principe", label: "Sao Tome and Principe" },
  { value: "Saudi Arabia", label: "Saudi Arabia" },
  { value: "Senegal", label: "Senegal" },
  { value: "Serbia", label: "Serbia" },
  { value: "Seychelles", label: "Seychelles" },
  { value: "Sierra Leone", label: "Sierra Leone" },
  { value: "Singapore", label: "Singapore" },
  { value: "Slovakia", label: "Slovakia" },
  { value: "Slovenia", label: "Slovenia" },
  { value: "Solomon Islands", label: "Solomon Islands" },
  { value: "Somalia", label: "Somalia" },
  { value: "South Africa", label: "South Africa" },
  { value: "South Korea", label: "South Korea" },
  { value: "South Sudan", label: "South Sudan" },
  { value: "Spain", label: "Spain" },
  { value: "Sri Lanka", label: "Sri Lanka" },
  { value: "Sudan", label: "Sudan" },
  { value: "Suriname", label: "Suriname" },
  { value: "Sweden", label: "Sweden" },
  { value: "Switzerland", label: "Switzerland" },
  { value: "Syria", label: "Syria" },
  { value: "Taiwan", label: "Taiwan" },
  { value: "Tajikistan", label: "Tajikistan" },
  { value: "Tanzania", label: "Tanzania" },
  { value: "Thailand", label: "Thailand" },
  { value: "Timor-Leste", label: "Timor-Leste" },
  { value: "Togo", label: "Togo" },
  { value: "Tonga", label: "Tonga" },
  { value: "Trinidad and Tobago", label: "Trinidad and Tobago" },
  { value: "Tunisia", label: "Tunisia" },
  { value: "Turkey", label: "Turkey" },
  { value: "Turkmenistan", label: "Turkmenistan" },
  { value: "Tuvalu", label: "Tuvalu" },
  { value: "Uganda", label: "Uganda" },
  { value: "Ukraine", label: "Ukraine" },
  { value: "United Arab Emirates", label: "United Arab Emirates" },
  { value: "United Kingdom", label: "United Kingdom" },
  { value: "United States of America", label: "United States of America" },
  { value: "Uruguay", label: "Uruguay" },
  { value: "Uzbekistan", label: "Uzbekistan" },
  { value: "Vanuatu", label: "Vanuatu" },
  { value: "Vatican City", label: "Vatican City" },
  { value: "Venezuela", label: "Venezuela" },
  { value: "Vietnam", label: "Vietnam" },
  { value: "Yemen", label: "Yemen" },
  { value: "Zambia", label: "Zambia" },
  { value: "Zimbabwe", label: "Zimbabwe" },
];

export interface tool {
  readonly value: string;
  readonly label: string;
  readonly color?: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
  readonly filePath?: string;
}

export const TOOLS: readonly tool[] = [
  {
    value: "Zendesk",
    label: "Zendesk",
    filePath: "/assets/toolkit/zendesk.png",
  },
  {
    value: "Freshdesk",
    label: "Freshdesk",
    filePath: "/assets/toolkit/freshdesk.png",
  },
  {
    value: "HelpScout",
    label: "HelpScout",
    filePath: "/assets/toolkit/helpscout.png",
  },
  {
    value: "Gorgias",
    label: "Gorgias",
    filePath: "/assets/toolkit/gorgias.png",
  },
  {
    value: "FrontApp",
    label: "Front App",
    filePath: "/assets/toolkit/frontapp.png",
  },
  {
    value: "Intercom",
    label: "Intercom",
    filePath: "/assets/toolkit/intercom.png",
  },
  {
    value: "Kustomer",
    label: "Kustomer",
    filePath: "/assets/toolkit/kustomer.png",
  },
  {
    value: "Acquire",
    label: "Acquire",
    filePath: "/assets/toolkit/acquire.png",
  },
  { value: "DevRev", label: "DevRev", filePath: "/assets/toolkit/devrev.jpeg" },
  { value: "Dixa", label: "Dixa", filePath: "/assets/toolkit/dixa.png" },
  { value: "Gladly", label: "Gladly", filePath: "/assets/toolkit/gladly.png" },
  {
    value: "Helpshift",
    label: "Helpshift",
    filePath: "/assets/toolkit/helpshift.png",
  },
  { value: "Hiver", label: "Hiver", filePath: "/assets/toolkit/hiver.png" },
  {
    value: "HubSpotServiceHub",
    label: "HubSpot Service Hub",
    filePath: "/assets/toolkit/hubspot.jpeg",
  },
  {
    value: "SalesforceServiceCloud",
    label: "Salesforce Service Cloud",
    filePath: "/assets/toolkit/salesforce.png",
  },
  {
    value: "ServiceNow",
    label: "ServiceNow",
    filePath: "/assets/toolkit/servicenow.png",
  },
  {
    value: "ZohoDesk",
    label: "ZohoDesk",
    filePath: "/assets/toolkit/zoho_desk.png",
  },
  //TODO: GET KAYAKO SVG
  { value: "Kayako", label: "Kayako", filePath: "/assets/toolkit/kayako.svg" },

  {
    value: "LiveChat",
    label: "LiveChat",
    filePath: "/assets/toolkit/livechat.png",
  },
  { value: "Siena", label: "Siena", filePath: "/assets/toolkit/siena.png" },
  {
    value: "Ultimate",
    label: "Ultimate",
    filePath: "/assets/toolkit/ultimate.png",
  },
  { value: "Ada", label: "Ada", filePath: "/assets/toolkit/ada.png" },
  {
    value: "Chatbase",
    label: "Chatbase",
    filePath: "/assets/toolkit/chatbase.png",
  },
  { value: "Guru", label: "Guru", filePath: "/assets/toolkit/guru.png" },
  {
    value: "KnowledgeOwl",
    label: "KnowledgeOwl",
    filePath: "/assets/toolkit/knowledgeowl.png",
  },
  {
    value: "Confluence",
    label: "Confluence",
    filePath: "/assets/toolkit/confluence.png",
  },
  {
    value: "Capacity",
    label: "Capacity",
    filePath: "/assets/toolkit/capacity.png",
  },
  {
    value: "HelpJuice",
    label: "HelpJuice",
    filePath: "/assets/toolkit/helpjuice.png",
  },
  { value: "Docebo", label: "Docebo", filePath: "/assets/toolkit/docebo.png" },
  {
    value: "Workramp",
    label: "Workramp",
    filePath: "/assets/toolkit/workramp.png",
  },
  {
    value: "Lessonly",
    label: "Lessonly",
    filePath: "/assets/toolkit/lessonly.png",
  },
  { value: "Kaizo", label: "Kaizo", filePath: "/assets/toolkit/kaizo.png" },
  {
    value: "Evaluagent",
    label: "Evaluagent",
    filePath: "/assets/toolkit/evaluagent.png",
  },
  {
    value: "Happitu",
    label: "Happitu",
    filePath: "/assets/toolkit/happitu.png",
  },
  { value: "Klaus", label: "Klaus", filePath: "/assets/toolkit/klaus.png" },
  // TODO: MISSING the WAIZEN Png
  { value: "Waizen", label: "Waizen", filePath: "/assets/toolkit/waizen.png" },
  { value: "Loris", label: "Loris", filePath: "/assets/toolkit/loris.png" },
  {
    value: "MaestroQA",
    label: "MaestroQA",
    filePath: "/assets/toolkit/maestroqa.png",
  },
  {
    value: "Assembled",
    label: "Assembled",
    filePath: "/assets/toolkit/assembled.png",
  },
  { value: "Soon", label: "Soon", filePath: "/assets/toolkit/soon.png" },
  {
    value: "Idiomatic",
    label: "Idiomatic",
    filePath: "/assets/toolkit/idiomatic.png",
  },
  { value: "Salto", label: "Salto", filePath: "/assets/toolkit/salto.png" },
  {
    value: "TheLoops",
    label: "TheLoops",
    filePath: "/assets/toolkit/theloops.png",
  },
  {
    value: "NiceReply",
    label: "NiceReply",
    filePath: "/assets/toolkit/nicereply.png",
  },
  {
    value: "GenesisCloudCX",
    label: "Genesis Cloud CX",
    filePath: "/assets/toolkit/genesis.png",
  },
  {
    value: "NiceCXOne",
    label: "Nice CXOne",
    filePath: "/assets/toolkit/nice_cxone.png",
  },
  {
    value: "ObserveAi",
    label: "Observe.ai",
    filePath: "/assets/toolkit/observe_ai.png",
  },
  {
    value: "Aircall",
    label: "Aircall",
    filePath: "/assets/toolkit/aircall.png",
  },
  {
    value: "AmazonConnect",
    label: "Amazon Connect",
    filePath: "/assets/toolkit/amazon_connect.png",
  },
  { value: "Avaya", label: "Avaya", filePath: "/assets/toolkit/avaya.png" },
  { value: "8x8", label: "8x8", filePath: "/assets/toolkit/8x8.png" },
  { value: "Cisco", label: "Cisco", filePath: "/assets/toolkit/cisco.png" },
  {
    value: "Cordless",
    label: "Cordless",
    filePath: "/assets/toolkit/cordless.png",
  },
  {
    value: "OpenPhone",
    label: "OpenPhone",
    filePath: "/assets/toolkit/openphone.png",
  },
  {
    value: "Dialpad",
    label: "Dialpad",
    filePath: "/assets/toolkit/dialpad.png",
  },
  {
    value: "RingCentral",
    label: "RingCentral",
    filePath: "/assets/toolkit/ringcentral.png",
  },
  {
    value: "Talkdesk",
    label: "Talkdesk",
    filePath: "/assets/toolkit/talkdesk.png",
  },
  { value: "Truco", label: "Truco", filePath: "/assets/toolkit/truco.png" },
  { value: "FlipCX", label: "FlipCX", filePath: "/assets/toolkit/flip_cx.png" },
  { value: "Five9", label: "Five9", filePath: "/assets/toolkit/five9.png" },
];

export interface expert {
  readonly value: string;
  readonly label: string;
  readonly color?: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
  readonly filePath?: string;
}

export const EXPERTISE = [
  {
    label: "Remote Work",
    value: "Remote Work",
    filePath: "/assets/expertise/remote_work.svg",
  },
  {
    label: "Building a Team",
    value: "Building a Team",
    filePath: "/assets/expertise/building_a_team.svg",
  },
  {
    label: "Team Management",
    value: "Team Management",
    filePath: "/assets/expertise/team_management.svg",
  },
  {
    label: "Onboarding",
    value: "Onboarding",
    filePath: "/assets/expertise/onboarding.svg",
  },
  {
    label: "Customer Journey Mapping",
    value: "Customer Journey Mapping",
    filePath: "/assets/expertise/customer_journey_mapping.svg",
  },
  {
    label: "User Experience (UX) Design",
    value: "User Experience (UX) Design",
    filePath: "/assets/expertise/user_experience_ux_design.svg",
  },
  {
    label: "Customer Service and Support",
    value: "Customer Service and Support",
    filePath: "/assets/expertise/customer_service_and_support.svg",
  },
  {
    label: "Data Analysis and Insights",
    value: "Data Analysis and Insights",
    filePath: "/assets/expertise/data_analysis_and_insights.svg",
  },
  {
    label: "Voice of the Customer (VoC) Programs",
    value: "Voice of the Customer (VoC) Programs",
    filePath: "/assets/expertise/voice_of_the_customer_voc_programs.svg",
  },
  {
    label: "Customer Feedback and Surveys",
    value: "Customer Feedback and Surveys",
    filePath: "/assets/expertise/customer_feedback_and_surveys.svg",
  },
  {
    label: "Customer Loyalty and Retention",
    value: "Customer Loyalty and Retention",
    filePath: "/assets/expertise/customer_loyalty_and_retention.svg",
  },
  {
    label: "Employee Training and Engagement",
    value: "Employee Training and Engagement",
    filePath: "/assets/expertise/employee_training_and_engagement.svg",
  },
  {
    label: "Omni-channel Experience",
    value: "Omni-channel Experience",
    filePath: "/assets/expertise/omni_channel_experience.svg",
  },
  {
    label: "Personalization",
    value: "Personalization",
    filePath: "/assets/expertise/personalization.svg",
  },
  {
    label: "Customer Success Management",
    value: "Customer Success Management",
    filePath: "/assets/expertise/customer_success_management.svg",
  },
  {
    label: "Crisis Management",
    value: "Crisis Management",
    filePath: "/assets/expertise/crisis_management.svg",
  },
  {
    label: "Technology Integration",
    value: "Technology Integration",
    filePath: "/assets/expertise/technology_integration.svg",
  },
  {
    label: "Brand Experience",
    value: "Brand Experience",
    filePath: "/assets/expertise/brand_experience.svg",
  },
  {
    label: "Social Media Management",
    value: "Social Media Management",
    filePath: "/assets/expertise/social_media_management.svg",
  },
  {
    label: "Customer Advocacy",
    value: "Customer Advocacy",
    filePath: "/assets/expertise/customer_advocacy.svg",
  },
  {
    label: "Outsourcing",
    value: "Outsourcing",
    filePath: "/assets/expertise/outsourcing.svg",
  },
  {
    label: "Vendor Management",
    value: "Vendor Management",
    filePath: "/assets/expertise/vendor_management.svg",
  },
  {
    label: "Customer-led Growth",
    value: "Customer-led Growth",
    filePath: "/assets/expertise/customer_led_growth.svg",
  },
];

export interface industry {
  readonly value: string;
  readonly label: string;
  readonly color?: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

export const INDUSTRIES: readonly industry[] = [
  { value: "Industry1", label: "Industry1" },
  { value: "Industry2", label: "Industry2" },
  { value: "Industry3", label: "Industry3" },
  { value: "Industry4", label: "Industry4" },
  { value: "Industry5", label: "Industry5" },
];

export interface ColourOption {
  readonly value: string;
  readonly label: string;
  readonly color: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

export const colourOptions: readonly ColourOption[] = [
  { value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
  { value: "blue", label: "Blue", color: "#0052CC", isDisabled: true },
  { value: "purple", label: "Purple", color: "#5243AA" },
  { value: "red", label: "Red", color: "#FF5630", isFixed: true },
  { value: "orange", label: "Orange", color: "#FF8B00" },
  { value: "yellow", label: "Yellow", color: "#FFC400" },
  { value: "green", label: "Green", color: "#36B37E" },
  { value: "forest", label: "Forest", color: "#00875A" },
  { value: "slate", label: "Slate", color: "#253858" },
  { value: "silver", label: "Silver", color: "#666666" },
];

export interface FlavourOption {
  readonly value: string;
  readonly label: string;
  readonly rating: string;
}

export const flavourOptions: readonly FlavourOption[] = [
  { value: "vanilla", label: "Vanilla", rating: "safe" },
  { value: "chocolate", label: "Chocolate", rating: "good" },
  { value: "strawberry", label: "Strawberry", rating: "wild" },
  { value: "salted-caramel", label: "Salted Caramel", rating: "crazy" },
];

export interface StateOption {
  readonly value: string;
  readonly label: string;
}

export const stateOptions: readonly StateOption[] = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AS", label: "American Samoa" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "DC", label: "District Of Columbia" },
  { value: "FM", label: "Federated States Of Micronesia" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "GU", label: "Guam" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MH", label: "Marshall Islands" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "MP", label: "Northern Mariana Islands" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PW", label: "Palau" },
  { value: "PA", label: "Pennsylvania" },
  { value: "PR", label: "Puerto Rico" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VI", label: "Virgin Islands" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
];

export const optionLength = [
  { value: 1, label: "general" },
  {
    value: 2,
    label:
      "Evil is the moment when I lack the strength to be true to the Good that compels me.",
  },
  {
    value: 3,
    label:
      "It is now an easy matter to spell out the ethic of a truth: 'Do all that you can to persevere in that which exceeds your perseverance. Persevere in the interruption. Seize in your being that which has seized and broken you.",
  },
];

export const dogOptions = [
  { id: 1, label: "Chihuahua" },
  { id: 2, label: "Bulldog" },
  { id: 3, label: "Dachshund" },
  { id: 4, label: "Akita" },
];

// let bigOptions = [];
// for (let i = 0; i < 10000; i++) {
// 	bigOptions = bigOptions.concat(colourOptions);
// }

export interface GroupedOption {
  readonly label: string;
  readonly options: readonly ColourOption[] | readonly FlavourOption[];
}

export const groupedOptions: readonly GroupedOption[] = [
  {
    label: "Colours",
    options: colourOptions,
  },
  {
    label: "Flavours",
    options: flavourOptions,
  },
];

export const animals = [
  {
    label: "Cat",
    value: "cat",
    description: "The second most popular pet in the world",
  },
  {
    label: "Dog",
    value: "dog",
    description: "The most popular pet in the world",
  },
  {
    label: "Elephant",
    value: "elephant",
    description: "The largest land animal",
  },
  { label: "Lion", value: "lion", description: "The king of the jungle" },
  { label: "Tiger", value: "tiger", description: "The largest cat species" },
  {
    label: "Giraffe",
    value: "giraffe",
    description: "The tallest land animal",
  },
  {
    label: "Dolphin",
    value: "dolphin",
    description: "A widely distributed and diverse group of aquatic mammals",
  },
  {
    label: "Penguin",
    value: "penguin",
    description: "A group of aquatic flightless birds",
  },
  {
    label: "Zebra",
    value: "zebra",
    description: "A several species of African equids",
  },
  {
    label: "Shark",
    value: "shark",
    description:
      "A group of elasmobranch fish characterized by a cartilaginous skeleton",
  },
  {
    label: "Whale",
    value: "whale",
    description: "Diverse group of fully aquatic placental marine mammals",
  },
  {
    label: "Otter",
    value: "otter",
    description: "A carnivorous mammal in the subfamily Lutrinae",
  },
  {
    label: "Crocodile",
    value: "crocodile",
    description: "A large semiaquatic reptile",
  },
];

interface Option {
  readonly value: string;
  readonly label: string;
}

export const ROLES: Option[] = [
  { value: "Account Manager", label: "Account Manager" },
  { value: "Customer Advocate", label: "Customer Advocate" },
  {
    value: "Customer Care Representative",
    label: "Customer Care Representative",
  },
  {
    value: "Customer Engagement Specialist",
    label: "Customer Engagement Specialist",
  },
  {
    value: "Customer Experience Analyst",
    label: "Customer Experience Analyst",
  },
  {
    value: "Customer Experience Coordinator",
    label: "Customer Experience Coordinator",
  },
  {
    value: "Customer Experience Designer",
    label: "Customer Experience Designer",
  },
  {
    value: "Customer Experience Director",
    label: "Customer Experience Director",
  },
  {
    value: "Customer Experience Manager",
    label: "Customer Experience Manager",
  },
  {
    value: "Customer Experience Officer",
    label: "Customer Experience Officer",
  },
  {
    value: "Customer Experience Specialist",
    label: "Customer Experience Specialist",
  },
  { value: "Customer Insights Analyst", label: "Customer Insights Analyst" },
  {
    value: "Customer Relationship Manager",
    label: "Customer Relationship Manager",
  },
  {
    value: "Customer Retention Specialist",
    label: "Customer Retention Specialist",
  },
  {
    value: "Customer Satisfaction Analyst",
    label: "Customer Satisfaction Analyst",
  },
  {
    value: "Customer Service Representative",
    label: "Customer Service Representative",
  },
  { value: "Customer Success Manager", label: "Customer Success Manager" },
  {
    value: "Customer Support Specialist",
    label: "Customer Support Specialist",
  },
  {
    value: "Customer Training Specialist",
    label: "Customer Training Specialist",
  },
  {
    value: "Digital Customer Experience Manager",
    label: "Digital Customer Experience Manager",
  },
  {
    value: "Director of Customer Support",
    label: "Director of Customer Support",
  },
  {
    value: "E-commerce Customer Service Representative",
    label: "E-commerce Customer Service Representative",
  },
  {
    value: "Head of Customer Experience",
    label: "Head of Customer Experience",
  },
  {
    value: "Live Chat Support Representative",
    label: "Live Chat Support Representative",
  },
  { value: "Online Community Manager", label: "Online Community Manager" },
  { value: "Product Experience Manager", label: "Product Experience Manager" },
  {
    value: "Senior Customer Experience Analyst",
    label: "Senior Customer Experience Analyst",
  },
  {
    value: "Senior Customer Support Engineer",
    label: "Senior Customer Support Engineer",
  },
  {
    value: "Social Media Customer Support Specialist",
    label: "Social Media Customer Support Specialist",
  },
  { value: "Support Operations Manager", label: "Support Operations Manager" },
  { value: "Technical Support Engineer", label: "Technical Support Engineer" },
  { value: "User Experience Designer", label: "User Experience Designer" },
  { value: "User Experience Researcher", label: "User Experience Researcher" },
  { value: "User Interface Designer", label: "User Interface Designer" },
  { value: "UX/UI Developer", label: "UX/UI Developer" },
  { value: "Voice of Customer Analyst", label: "Voice of Customer Analyst" },
  { value: "Customer Data Analyst", label: "Customer Data Analyst" },
  {
    value: "Customer Journey Mapping Specialist",
    label: "Customer Journey Mapping Specialist",
  },
  {
    value: "Customer Onboarding Specialist",
    label: "Customer Onboarding Specialist",
  },
  {
    value: "Customer Service Supervisor",
    label: "Customer Service Supervisor",
  },
  {
    value: "Customer Success Coordinator",
    label: "Customer Success Coordinator",
  },
  {
    value: "Customer Success Operations Manager",
    label: "Customer Success Operations Manager",
  },
  { value: "Customer Support Manager", label: "Customer Support Manager" },
  { value: "Customer Support Team Lead", label: "Customer Support Team Lead" },
  { value: "Customer Training Manager", label: "Customer Training Manager" },
  { value: "Digital Experience Manager", label: "Digital Experience Manager" },
  {
    value: "Director of Customer Success",
    label: "Director of Customer Success",
  },
  {
    value: "Director of User Experience",
    label: "Director of User Experience",
  },
  {
    value: "E-commerce Customer Experience Manager",
    label: "E-commerce Customer Experience Manager",
  },
  { value: "Head of Customer Support", label: "Head of Customer Support" },
  { value: "Product Support Engineer", label: "Product Support Engineer" },
  {
    value: "Senior Customer Experience Manager",
    label: "Senior Customer Experience Manager",
  },
  {
    value: "Senior User Experience Researcher",
    label: "Senior User Experience Researcher",
  },
  { value: "UX/UI Lead", label: "UX/UI Lead" },
  { value: "Voice of Customer Manager", label: "Voice of Customer Manager" },
];

export const languageData: Option[] = [
  { label: "Afrikaans", value: "Afrikaans" },
  { label: "Albanian", value: "Albanian" },
  { label: "Amharic", value: "Amharic" },
  { label: "Arabic", value: "Arabic" },
  { label: "Armenian", value: "Armenian" },
  { label: "Assamese", value: "Assamese" },
  { label: "Aymara", value: "Aymara" },
  { label: "Azerbaijani", value: "Azerbaijani" },
  { label: "Bambara", value: "Bambara" },
  { label: "Basque", value: "Basque" },
  { label: "Belarusian", value: "Belarusian" },
  { label: "Bengali", value: "Bengali" },
  { label: "Bhojpuri", value: "Bhojpuri" },
  { label: "Bosnian", value: "Bosnian" },
  { label: "Bulgarian", value: "Bulgarian" },
  { label: "Catalan", value: "Catalan" },
  { label: "Cebuano", value: "Cebuano" },
  { label: "Chinese (Simplified)", value: "Chinese (Simplified)" },
  { label: "Chinese (Traditional)", value: "Chinese (Traditional)" },
  { label: "Corsican", value: "Corsican" },
  { label: "Croatian", value: "Croatian" },
  { label: "Czech", value: "Czech" },
  { label: "Danish", value: "Danish" },
  { label: "Dhivehi", value: "Dhivehi" },
  { label: "Dogri", value: "Dogri" },
  { label: "Dutch", value: "Dutch" },
  { label: "English", value: "English" },
  { label: "Esperanto", value: "Esperanto" },
  { label: "Estonian", value: "Estonian" },
  { label: "Ewe", value: "Ewe" },
  { label: "Filipino (Tagalog)", value: "Filipino (Tagalog)" },
  { label: "Finnish", value: "Finnish" },
  { label: "French", value: "French" },
  { label: "Frisian", value: "Frisian" },
  { label: "Galician", value: "Galician" },
  { label: "Georgian", value: "Georgian" },
  { label: "German", value: "German" },
  { label: "Greek", value: "Greek" },
  { label: "Guarani", value: "Guarani" },
  { label: "Gujarati", value: "Gujarati" },
  { label: "Haitian Creole", value: "Haitian Creole" },
  { label: "Hausa", value: "Hausa" },
  { label: "Hawaiian", value: "Hawaiian" },
  { label: "Hebrew", value: "Hebrew" },
  { label: "Hindi", value: "Hindi" },
  { label: "Hmong", value: "Hmong" },
  { label: "Hungarian", value: "Hungarian" },
  { label: "Icelandic", value: "Icelandic" },
  { label: "Igbo", value: "Igbo" },
  { label: "Ilocano", value: "Ilocano" },
  { label: "Indonesian", value: "Indonesian" },
  { label: "Irish", value: "Irish" },
  { label: "Italian", value: "Italian" },
  { label: "Japanese", value: "Japanese" },
  { label: "Javanese", value: "Javanese" },
  { label: "Kannada", value: "Kannada" },
  { label: "Kazakh", value: "Kazakh" },
  { label: "Khmer", value: "Khmer" },
  { label: "Kinyarwanda", value: "Kinyarwanda" },
  { label: "Konkani", value: "Konkani" },
  { label: "Korean", value: "Korean" },
  { label: "Krio", value: "Krio" },
  { label: "Kurdish", value: "Kurdish" },
  { label: "Kurdish (Sorani)", value: "Kurdish (Sorani)" },
  { label: "Kyrgyz", value: "Kyrgyz" },
  { label: "Lao", value: "Lao" },
  { label: "Latin", value: "Latin" },
  { label: "Latvian", value: "Latvian" },
  { label: "Lingala", value: "Lingala" },
  { label: "Lithuanian", value: "Lithuanian" },
  { label: "Luganda", value: "Luganda" },
  { label: "Luxembourgish", value: "Luxembourgish" },
  { label: "Macedonian", value: "Macedonian" },
  { label: "Maithili", value: "Maithili" },
  { label: "Malagasy", value: "Malagasy" },
  { label: "Malay", value: "Malay" },
  { label: "Malayalam", value: "Malayalam" },
  { label: "Maltese", value: "Maltese" },
  { label: "Maori", value: "Maori" },
  { label: "Marathi", value: "Marathi" },
  { label: "Meiteilon (Manipuri)", value: "Meiteilon (Manipuri)" },
  { label: "Mizo", value: "Mizo" },
  { label: "Mongolian", value: "Mongolian" },
  { label: "Myanmar (Burmese)", value: "Myanmar (Burmese)" },
  { label: "Nepali", value: "Nepali" },
  { label: "Norwegian", value: "Norwegian" },
  { label: "Nyanja (Chichewa)", value: "Nyanja (Chichewa)" },
  { label: "Odia (Oriya)", value: "Odia (Oriya)" },
  { label: "Oromo", value: "Oromo" },
  { label: "Pashto", value: "Pashto" },
  { label: "Persian", value: "Persian" },
  { label: "Polish", value: "Polish" },
  {
    label: "Portuguese (Portugal, Brazil)",
    value: "Portuguese (Portugal, Brazil)",
  },
  { label: "Punjabi", value: "Punjabi" },
  { label: "Quechua", value: "Quechua" },
  { label: "Romanian", value: "Romanian" },
  { label: "Russian", value: "Russian" },
  { label: "Samoan", value: "Samoan" },
  { label: "Sanskrit", value: "Sanskrit" },
  { label: "Scots Gaelic", value: "Scots Gaelic" },
  { label: "Sepedi", value: "Sepedi" },
  { label: "Serbian", value: "Serbian" },
  { label: "Sesotho", value: "Sesotho" },
  { label: "Shona", value: "Shona" },
  { label: "Sindhi", value: "Sindhi" },
  { label: "Sinhala (Sinhalese)", value: "Sinhala (Sinhalese)" },
  { label: "Slovak", value: "Slovak" },
  { label: "Slovenian", value: "Slovenian" },
  { label: "Somali", value: "Somali" },
  { label: "Spanish", value: "Spanish" },
  { label: "Sundanese", value: "Sundanese" },
  { label: "Swahili", value: "Swahili" },
  { label: "Swedish", value: "Swedish" },
  { label: "Tagalog (Filipino)", value: "Tagalog (Filipino)" },
  { label: "Tajik", value: "Tajik" },
  { label: "Tamil", value: "Tamil" },
  { label: "Tatar", value: "Tatar" },
  { label: "Telugu", value: "Telugu" },
  { label: "Thai", value: "Thai" },
  { label: "Tigrinya", value: "Tigrinya" },
  { label: "Tsonga", value: "Tsonga" },
  { label: "Turkish", value: "Turkish" },
  { label: "Turkmen", value: "Turkmen" },
  { label: "Twi (Akan)", value: "Twi (Akan)" },
  { label: "Ukrainian", value: "Ukrainian" },
  { label: "Urdu", value: "Urdu" },
  { label: "Uyghur", value: "Uyghur" },
  { label: "Uzbek", value: "Uzbek" },
  { label: "Vietnamese", value: "Vietnamese" },
  { label: "Welsh", value: "Welsh" },
  { label: "Xhosa", value: "Xhosa" },
  { label: "Yiddish", value: "Yiddish" },
  { label: "Yoruba", value: "Yoruba" },
  { label: "Zulu", value: "Zulu" },
];

export const companySizeOptions: Option[] = [
  { label: "Solo", value: "Solo" },
  { label: "2-5", value: "2-5" },
  { label: "6-20", value: "6-20" },
  { label: "21-50", value: "21-50" },
  { label: "50+", value: "50+" },
];

export const industryData = [
  {
    label: "Agriculture",
    value: "Agriculture",
    filePath: "/assets/industries/agriculture.svg",
  },
  {
    label: "Architecture",
    value: "Architecture",
    filePath: "/assets/industries/architecture.svg",
  },
  {
    label: "Automotive",
    value: "Automotive",
    filePath: "/assets/industries/automotive.svg",
  },
  {
    label: "Biotechnology",
    value: "Biotechnology",
    filePath: "/assets/industries/biotechnology.svg",
  },
  {
    label: "Construction",
    value: "Construction",
    filePath: "/assets/industries/construction.svg",
  },
  {
    label: "Consulting",
    value: "Consulting",
    filePath: "/assets/industries/consulting.svg",
  },
  {
    label: "Consumer Goods",
    value: "Consumer Goods",
    filePath: "/assets/industries/consumer_goods.svg",
  },
  {
    label: "Design and Creative Services",
    value: "Design and Creative Services",
    filePath: "/assets/industries/design_and_creative_services.svg",
  },
  {
    label: "Ecommerce",
    value: "Ecommerce",
    filePath: "/assets/industries/ecommerce.svg",
  },
  {
    label: "Education",
    value: "Education",
    filePath: "/assets/industries/education.svg",
  },
  {
    label: "Energy",
    value: "Energy",
    filePath: "/assets/industries/energy.svg",
  },
  {
    label: "Entertainment",
    value: "Entertainment",
    filePath: "/assets/industries/entertainment.svg",
  },
  {
    label: "Event Management",
    value: "Event Management",
    filePath: "/assets/industries/event_management.svg",
  },
  {
    label: "Financial Services",
    value: "Financial Services",
    filePath: "/assets/industries/financial_services.svg",
  },
  {
    label: "Fitness and Wellness",
    value: "Fitness and Wellness",
    filePath: "/assets/industries/fitness_and_wellness.svg",
  },
  {
    label: "Food and Beverage",
    value: "Food and Beverage",
    filePath: "/assets/industries/food_and_beverage.svg",
  },
  {
    label: "Gaming",
    value: "Gaming",
    filePath: "/assets/industries/gaming.svg",
  },
  {
    label: "Government Services",
    value: "Government Services",
    filePath: "/assets/industries/government_services.svg",
  },
  {
    label: "Healthcare",
    value: "Healthcare",
    filePath: "/assets/industries/healthcare.svg",
  },
  {
    label: "Hospitality",
    value: "Hospitality",
    filePath: "/assets/industries/hospitality.svg",
  },
  {
    label: "Human Resources",
    value: "Human Resources",
    filePath: "/assets/industries/human_resources.svg",
  },
  {
    label: "Information Technology",
    value: "Information Technology",
    filePath: "/assets/industries/information_technology.svg",
  },
  {
    label: "Insurance",
    value: "Insurance",
    filePath: "/assets/industries/insurance.svg",
  },
  {
    label: "Internet Services",
    value: "Internet Services",
    filePath: "/assets/industries/internet_services.svg",
  },
  {
    label: "Legal Services",
    value: "Legal Services",
    filePath: "/assets/industries/legal_services.svg",
  },
  {
    label: "Logistics",
    value: "Logistics",
    filePath: "/assets/industries/logistics.svg",
  },
  {
    label: "Luxury Goods",
    value: "Luxury Goods",
    filePath: "/assets/industries/luxury_goods.svg",
  },
  {
    label: "Manufacturing",
    value: "Manufacturing",
    filePath: "/assets/industries/manufacturing.svg",
  },
  {
    label: "Marketing and Advertising",
    value: "Marketing and Advertising",
    filePath: "/assets/industries/marketing_and_advertising.svg",
  },
  {
    label: "Media and Publishing",
    value: "Media and Publishing",
    filePath: "/assets/industries/media_and_publishing.svg",
  },
  {
    label: "Nonprofit Organizations",
    value: "Nonprofit Organizations",
    filePath: "/assets/industries/non_profit.svg",
  },
  {
    label: "Pharmaceutical",
    value: "Pharmaceutical",
    filePath: "/assets/industries/pharmaceutical.svg",
  },
  {
    label: "Public Relations",
    value: "Public Relations",
    filePath: "/assets/industries/public_relations.svg",
  },
  {
    label: "Public Sector",
    value: "Public Sector",
    filePath: "/assets/industries/public_sector.svg",
  },
  {
    label: "Real Estate",
    value: "Real Estate",
    filePath: "/assets/industries/real_estate.svg",
  },
  {
    label: "Retail",
    value: "Retail",
    filePath: "/assets/industries/retail.svg",
  },
  {
    label: "Social Media",
    value: "Social Media",
    filePath: "/assets/industries/social_media.svg",
  },
  {
    label: "Software as a Service (SaaS)",
    value: "Software as a Service (SaaS)",
    filePath: "/assets/industries/software_as_a_service.svg",
  },
  {
    label: "Sports",
    value: "Sports",
    filePath: "/assets/industries/sports.svg",
  },
  {
    label: "Technology",
    value: "Technology",
    filePath: "/assets/industries/technology.svg",
  },
  {
    label: "Telecommunications",
    value: "Telecommunications",
    filePath: "/assets/industries/telecommunications.svg",
  },
  {
    label: "Tourism",
    value: "Tourism",
    filePath: "/assets/industries/tourism.svg",
  },
  {
    label: "Transportation",
    value: "Transportation",
    filePath: "/assets/industries/transportation.svg",
  },
  {
    label: "Utilities",
    value: "Utilities",
    filePath: "/assets/industries/utilities.svg",
  },
];
