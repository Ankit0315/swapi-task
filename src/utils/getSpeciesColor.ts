const speciesColors: Record<string, string> = {
  Human: "from-blue-500 to-cyan-500",
  Droid: "from-gray-500 to-gray-600",
  Wookiee: "from-yellow-500 to-orange-500",
  Rodian: "from-green-500 to-emerald-500",
  Hutt: "from-purple-500 to-pink-500",
  "Twi'lek": "from-pink-500 to-rose-500",
  Yoda: "from-green-400 to-emerald-400",
  Gungan: "from-teal-500 to-cyan-500",
  Trandoshan: "from-orange-500 to-red-500",
  MonCalamari: "from-blue-400 to-indigo-500",
  Ewok: "from-amber-500 to-yellow-500",
  Sullustan: "from-gray-400 to-gray-500",
  Neimodian: "from-indigo-500 to-purple-500",
  Geonosian: "from-yellow-400 to-amber-500",
};

const getSpeciesColor = (species: string[]): string | null => {
  if (
    !species ||
    species.length === 0 ||
    !species[0] ||
    species[0] === "" ||
    species[0] === "Unknown"
  ) {
    return null;
  }
  const name = species[0];
  return speciesColors[name] || null;
};

export default getSpeciesColor;
