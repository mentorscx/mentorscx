import { env } from "@/env";
import { Partner } from "@/lib/actions/shared.types";

export interface timeZone {
  readonly value: string;
  readonly label: string;
  readonly color?: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

export const TIMEZONES = [
  { label: "America/New_York (Eastern Time)", value: "America/New_York" },
  { label: "Europe/London (Greenwich Mean Time)", value: "Europe/London" },
  { label: "Asia/Tokyo (Japan Standard Time)", value: "Asia/Tokyo" },
  { label: "Europe/Berlin (Central European Time)", value: "Europe/Berlin" },
  { label: "America/Los_Angeles (Pacific Time)", value: "America/Los_Angeles" },
  {
    label: "Australia/Sydney (Australian Eastern Time)",
    value: "Australia/Sydney",
  },
  { label: "Asia/Shanghai (China Standard Time)", value: "Asia/Shanghai" },
  { label: "Asia/Dubai (Gulf Standard Time)", value: "Asia/Dubai" },
  { label: "Asia/Kolkata (India Standard Time)", value: "Asia/Kolkata" },
  { label: "Europe/Moscow (Moscow Standard Time)", value: "Europe/Moscow" },
  { label: "Asia/Seoul (Korea Standard Time)", value: "Asia/Seoul" },
  { label: "America/Sao_Paulo (Brasilia Time)", value: "America/Sao_Paulo" },
  {
    label: "Africa/Johannesburg (South Africa Standard Time)",
    value: "Africa/Johannesburg",
  },
  { label: "America/Mexico_City (Central Time)", value: "America/Mexico_City" },
  { label: "Asia/Jakarta (Indonesia Western Time)", value: "Asia/Jakarta" },
  { label: "Europe/Paris (Central European Time)", value: "Europe/Paris" },
  { label: "Europe/Istanbul (Turkey Time)", value: "Europe/Istanbul" },
  { label: "America/Toronto (Eastern Time)", value: "America/Toronto" },
  { label: "Asia/Singapore (Singapore Time)", value: "Asia/Singapore" },
  { label: "Europe/Rome (Central European Time)", value: "Europe/Rome" },
  {
    label: "America/Buenos_Aires (Argentina Time)",
    value: "America/Buenos_Aires",
  },
  { label: "Europe/Athens (Eastern European Time)", value: "Europe/Athens" },
  { label: "Asia/Bangkok (Indochina Time)", value: "Asia/Bangkok" },
  { label: "Africa/Cairo (Eastern European Time)", value: "Africa/Cairo" },
  { label: "America/Vancouver (Pacific Time)", value: "America/Vancouver" },
  { label: "Africa/Nairobi (East Africa Time)", value: "Africa/Nairobi" },
  { label: "Europe/Madrid (Central European Time)", value: "Europe/Madrid" },
  { label: "Asia/Kuala_Lumpur (Malaysia Time)", value: "Asia/Kuala_Lumpur" },
  {
    label: "Europe/Amsterdam (Central European Time)",
    value: "Europe/Amsterdam",
  },
  { label: "Asia/Manila (Philippine Time)", value: "Asia/Manila" },
  {
    label: "Europe/Stockholm (Central European Time)",
    value: "Europe/Stockholm",
  },
  { label: "America/Lima (Peru Time)", value: "America/Lima" },
  { label: "Asia/Hong_Kong (Hong Kong Time)", value: "Asia/Hong_Kong" },
  { label: "Asia/Taipei (Taiwan Time)", value: "Asia/Taipei" },
  { label: "America/Bogota (Colombia Time)", value: "America/Bogota" },
  { label: "Europe/Zurich (Central European Time)", value: "Europe/Zurich" },
  { label: "America/Denver (Mountain Time)", value: "America/Denver" },
  { label: "Asia/Beirut (Eastern European Time)", value: "Asia/Beirut" },
  {
    label: "Australia/Perth (Australian Western Standard Time)",
    value: "Australia/Perth",
  },
  { label: "Asia/Karachi (Pakistan Standard Time)", value: "Asia/Karachi" },
  { label: "America/Chicago (Central Time)", value: "America/Chicago" },
  { label: "Europe/Lisbon (Western European Time)", value: "Europe/Lisbon" },
  { label: "Asia/Dhaka (Bangladesh Standard Time)", value: "Asia/Dhaka" },
  { label: "Asia/Riyadh (Arabian Standard Time)", value: "Asia/Riyadh" },
  { label: "Europe/Oslo (Central European Time)", value: "Europe/Oslo" },
  { label: "Asia/Tehran (Iran Standard Time)", value: "Asia/Tehran" },
  { label: "America/Montreal (Eastern Time)", value: "America/Montreal" },
  {
    label: "Europe/Brussels (Central European Time)",
    value: "Europe/Brussels",
  },
  { label: "Asia/Amman (Eastern European Time)", value: "Asia/Amman" },
  { label: "Asia/Ho_Chi_Minh (Indochina Time)", value: "Asia/Ho_Chi_Minh" },
  {
    label: "America/Phoenix (Mountain Standard Time)",
    value: "America/Phoenix",
  },
  {
    label: "Europe/Helsinki (Eastern European Time)",
    value: "Europe/Helsinki",
  },
  { label: "America/Caracas (Venezuela Time)", value: "America/Caracas" },
  { label: "Asia/Yakutsk (Yakutsk Time)", value: "Asia/Yakutsk" },
  { label: "Pacific/Auckland (New Zealand Time)", value: "Pacific/Auckland" },
  { label: "America/Anchorage (Alaska Time)", value: "America/Anchorage" },
  { label: "Asia/Calcutta (India Standard Time)", value: "Asia/Calcutta" },
  { label: "Europe/Vienna (Central European Time)", value: "Europe/Vienna" },
  { label: "America/Halifax (Atlantic Time)", value: "America/Halifax" },
  { label: "Asia/Muscat (Gulf Standard Time)", value: "Asia/Muscat" },
  { label: "Europe/Kiev (Eastern European Time)", value: "Europe/Kiev" },
  { label: "Asia/Magadan (Magadan Time)", value: "Asia/Magadan" },
  { label: "Europe/Warsaw (Central European Time)", value: "Europe/Warsaw" },
  {
    label: "America/Guatemala (Central America Time)",
    value: "America/Guatemala",
  },
  { label: "Asia/Qatar (Arabian Standard Time)", value: "Asia/Qatar" },
  {
    label: "Europe/Bucharest (Eastern European Time)",
    value: "Europe/Bucharest",
  },
  {
    label: "Pacific/Honolulu (Hawaii-Aleutian Standard Time)",
    value: "Pacific/Honolulu",
  },
  { label: "Africa/Lagos (West Africa Time)", value: "Africa/Lagos" },
  { label: "Asia/Jerusalem (Israel Standard Time)", value: "Asia/Jerusalem" },
  { label: "America/Winnipeg (Central Time)", value: "America/Winnipeg" },
  { label: "Europe/Prague (Central European Time)", value: "Europe/Prague" },
  {
    label: "America/El_Salvador (Central America Time)",
    value: "America/El_Salvador",
  },
  { label: "Asia/Baku (Azerbaijan Standard Time)", value: "Asia/Baku" },
  {
    label: "Europe/Belgrade (Central European Time)",
    value: "Europe/Belgrade",
  },
  { label: "America/Regina (Central Standard Time)", value: "America/Regina" },
  {
    label: "America/Newfoundland (Newfoundland Time)",
    value: "America/St_Johns",
  },
  { label: "Asia/Almaty (East Kazakhstan Time)", value: "Asia/Almaty" },
  {
    label: "Europe/Budapest (Central European Time)",
    value: "Europe/Budapest",
  },
  { label: "America/Santiago (Chile Time)", value: "America/Santiago" },
  { label: "Asia/Colombo (India Standard Time)", value: "Asia/Colombo" },
  {
    label: "Europe/Copenhagen (Central European Time)",
    value: "Europe/Copenhagen",
  },
  { label: "America/Panama (Eastern Time)", value: "America/Panama" },
  { label: "Europe/Oslo (Central European Time)", value: "Europe/Oslo" },
  { label: "Asia/Ulaanbaatar (Ulaanbaatar Time)", value: "Asia/Ulaanbaatar" },
  { label: "Asia/Damascus (Eastern European Time)", value: "Asia/Damascus" },
  { label: "America/Asuncion (Paraguay Time)", value: "America/Asuncion" },
  { label: "Europe/Dublin (Greenwich Mean Time)", value: "Europe/Dublin" },
  { label: "Asia/Yerevan (Armenia Time)", value: "Asia/Yerevan" },
  {
    label: "America/Tegucigalpa (Central America Time)",
    value: "America/Tegucigalpa",
  },
  { label: "Asia/Urumqi (China Time)", value: "Asia/Urumqi" },
  { label: "America/Managua (Central America Time)", value: "America/Managua" },
  { label: "Asia/Kabul (Afghanistan Time)", value: "Asia/Kabul" },
  { label: "America/Dominica (Atlantic Time)", value: "America/Dominica" },
  { label: "Asia/Omsk (Omsk Time)", value: "Asia/Omsk" },
  {
    label: "Europe/Luxembourg (Central European Time)",
    value: "Europe/Luxembourg",
  },
  { label: "America/Montevideo (Uruguay Time)", value: "America/Montevideo" },
  { label: "Asia/Novosibirsk (Novosibirsk Time)", value: "Asia/Novosibirsk" },
  { label: "Europe/Malta (Central European Time)", value: "Europe/Malta" },
  { label: "Asia/Sanaa (Arabian Standard Time)", value: "Asia/Sanaa" },
  { label: "Asia/Thimphu (Bhutan Time)", value: "Asia/Thimphu" },
  { label: "Europe/Riga (Eastern European Time)", value: "Europe/Riga" },
  { label: "Asia/Chita (Yakutsk Time)", value: "Asia/Chita" },
  {
    label: "America/Curacao (Atlantic Standard Time)",
    value: "America/Curacao",
  },
] as const;

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
    label: "FrontApp",
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
    label: "HubSpotServiceHub",
    filePath: "/assets/toolkit/hubspot.jpeg",
  },
  {
    value: "SalesforceServiceCloud",
    label: "SalesforceServiceCloud",
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

  { value: "Kayako", label: "Kayako", filePath: "/assets/toolkit/kayako.webp" },

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
    filePath: "/assets/toolkit/knowledge_owl.svg",
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
    filePath: "/assets/toolkit/help_juice.png",
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
  { value: "Loris", label: "Loris", filePath: "/assets/toolkit/loris.jpeg" },
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
    label: "GenesisCloudCX",
    filePath: "/assets/toolkit/genesis.png",
  },
  {
    value: "NiceCXOne",
    label: "NiceCXOne",
    filePath: "/assets/toolkit/nice_cx_one.png",
  },
  {
    value: "ObserveAi",
    label: "ObserveAi",
    filePath: "/assets/toolkit/observe_ai.png",
  },
  {
    value: "Aircall",
    label: "Aircall",
    filePath: "/assets/toolkit/aircall.png",
  },
  {
    value: "AmazonConnect",
    label: "AmazonConnect",
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
    filePath: "/assets/expertise/user_experience.svg",
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
    filePath: "/assets/expertise/voice_of_the_customer_programs.svg",
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
    filePath: "/assets/expertise/customer_led_experience.svg",
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
    filePath: "/assets/industries/healthcare.svg",
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

export const plans = [
  {
    _id: 1,
    name: "Eclipse",
    icon: "/assets/icons/free-plan.svg",
    price: 39,
    priceId: "price_1PpAwjEE1IEtny7DcLD4yyZs",
    description: "For those exploring the mentorship world",
    credits: 2,
    planEnabled: true,
    inclusions: [
      {
        label: "2 calls/month",
        isIncluded: true,
      },
      {
        label: "Access to all mentors",
        isIncluded: true,
      },
      {
        label: "Chat with mentors before booking",
        isIncluded: true,
      },
      {
        label: "Dedicated support",
        isIncluded: true,
      },
    ],
  },
  {
    _id: 2,
    name: "Moon",
    icon: "/assets/icons/free-plan.svg",
    price: 59,
    priceId: "price_1PpAxPEE1IEtny7DThlakaLQ",
    description: "For those committed to a more sustainable growth",
    credits: 10000,
    planEnabled: true,
    inclusions: [
      {
        label: "Everything in Eclipse",
        isIncluded: true,
      },
      {
        label: "Unlimited calls/month",
        isIncluded: true,
      },
      {
        label: "Personalized onboarding",
        isIncluded: true,
      },
      {
        label: "Access to deals on tools",
        isIncluded: true,
      },
    ],
  },
  {
    _id: 3,
    name: "Sun",
    icon: "/assets/icons/free-plan.svg",
    price: 99,
    priceId: "",
    description: "For those committed to a more sustainable growth",
    credits: 10000,
    planEnabled: false,
    inclusions: [
      {
        label: "Everything in Moon",
        isIncluded: true,
      },
      {
        label: "5 seats (+$39/additional user)",
        isIncluded: true,
      },
      {
        label: "Transferable seats",
        isIncluded: true,
      },
      {
        label: "",
        isIncluded: false,
      },
    ],
  },
];

const getPriceId = (
  planName: string,
  interval: "monthly" | "annual"
): string => {
  const envKey = `NEXT_PUBLIC_STRIPE_${planName.toUpperCase()}_${interval.toUpperCase()}_PRICE_ID`;
  const priceId = process.env[envKey];

  if (!priceId) {
    console.warn(`Missing environment variable: ${envKey}`);
    return "";
  }

  return priceId;
};

export const pricingPlans = [
  {
    id: 1,
    name: "Eclipse",
    monthlyPrice: 39,
    annualPrice: 31,
    credits: 2,
    monthlyPriceId: env.NEXT_PUBLIC_STRIPE_ECLIPSE_MONTHLY_PRICE_ID,
    annualPriceId: env.NEXT_PUBLIC_STRIPE_ECLIPSE_ANNUAL_PRICE_ID,
    description: "For those exploring the mentorship world",
    features: [
      "2 calls/month",
      "Access to all mentors",
      "Chat with mentors before booking",
      "Dedicated support",
    ],
    buttonLabel: "I'm ready 😊",
    highlight: false,
    comingSoon: false,
  },
  {
    id: 2,
    name: "Moon",
    monthlyPrice: 59,
    annualPrice: 49,
    credits: 10001,
    monthlyPriceId: env.NEXT_PUBLIC_STRIPE_MOON_MONTHLY_PRICE_ID,
    annualPriceId: env.NEXT_PUBLIC_STRIPE_MOON_ANNUAL_PRICE_ID,
    description: "For those committed to a more sustainable growth",
    features: [
      "Everything in Eclipse",
      "Unlimited calls/month",
      "Personalized onboarding",
      "Access to deals on tools that help your CX career",
    ],
    buttonLabel: "I'm ready 😊",
    highlight: true,
    comingSoon: false,
  },
  {
    id: 3,
    name: "Sun",
    monthlyPrice: 199,
    annualPrice: 159,
    credits: 20001,
    monthlyPriceId: env.NEXT_PUBLIC_STRIPE_SUN_MONTHLY_PRICE_ID,
    annualPriceId: env.NEXT_PUBLIC_STRIPE_SUN_ANNUAL_PRICE_ID,
    description: "For teams that want to grow & develop together",
    features: [
      "Everything in Moon",
      "5 seats (+$39/additional user)",
      "Transferable seats",
    ],
    buttonLabel: "I'm ready 😊",
    highlight: false,
    comingSoon: true,
  },
];

// First, define constants for plan types and their limits
export const PLAN_BOOKING_LIMITS = {
  Moon: 4,
  Eclipse: 2,
  Sun: 4,
  Default: 0,
} as const;

// First, define constants for plan types and their limits
export const PLAN_CREDIT_LIMITS = {
  Moon: 10001,
  Eclipse: 2,
  Sun: 10001,
  Default: 0,
} as const;

// data.ts
export const partners: Partner[] = [
  {
    logo: "/assets/toolkit/keak.png",
    name: "Keak",
    category: "AI Optimization",
    offer: "Enterprise Plan Access",
    description:
      "AI-powered A/B testing and conversion rate optimization platform",
    ctaText: "Claim Enterprise Access",
    value: "$69 monthly",
    summary:
      "Keak specializes in automated A/B testing and conversion rate optimization (CRO) using AI to boost engagement and conversions by testing site elements like text and layouts, refining based on user data.",
    redemptionUrl:
      "https://keak.com/mentorscx?utm_source=mentorscx&utm_medium=perks&utm_campaign=enterprise",
    details: [
      "You will be able to use the Enterprise Plan",
      "Find out more about keak interactive Ai Optimization at learn.keak.com/documentation#how-it-works",
    ],
    terms: [
      "Valid for Mentors only!",
      "The $21 credit only applies for a two month subscription on the enterprise Plan",
      "You can see our full Terms & Conditions at keak.com/terms",
    ],
    howToClaim:
      "Follow the link to contact us, fill out the form, and just let us know if you are interested and how we can help you!",
  },
  {
    logo: "/assets/toolkit/soon.png",
    name: "Soon",
    category: "Coming Soon",
    offer: "Coming Soon",
    description: "Details will be announced shortly",
    ctaText: "Stay Tuned",
    value: "TBA",
    summary: "More details about Soon's offering will be available shortly.",
    redemptionUrl: "#",
    details: ["Details will be announced soon"],
    terms: ["Terms will be announced shortly"],
    howToClaim: "Coming soon",
  },
  {
    logo: "/clients/hire-horatio.jpeg",
    name: "Hire Horatio",
    category: "CX Outsourcing",
    offer: "$2,000 Launch Credit",
    description: "24/7 multilingual customer support outsourcing solutions",
    ctaText: "Claim Launch Credit",
    value: "$2,000",
    summary:
      "Hire Horatio is your trusted outsourcing partner, providing 24/7 multilingual support and seamless, on-brand service across all channels. Our expert teams don't just extend your team—we enhance it.",
    redemptionUrl:
      "https://hirehoratio.com/mentorscx?utm_source=mentorscx&utm_medium=perks&utm_campaign=launch",
    details: [
      "You will be able to use your $2,000 credit for the setup fee of any of Hire Horatio's services, except consulting",
      "Find out more about our customer experience outsourcing services on our website",
    ],
    terms: [
      "Valid for new clients only",
      "The $2,000 credit only applies to the setup fee and not to any other payment, including the monthly service fee",
      "See our full Terms & Conditions on our website",
    ],
    howToClaim:
      "Follow the link to contact us, fill out the form, and just let us know which service you are interested in and how we can help you!",
  },
];
