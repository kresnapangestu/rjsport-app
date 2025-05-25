export const requiredValidator =
  (fieldName = "Field ini") =>
  (val) =>
    !val ? `${fieldName} wajib diisi` : "";

export const validationSchema = {
  name: (val) => (val.length >= 3 ? "" : "Minimal 3 karakter"),

  onlyNumber: (val) => (/^\d+$/.test(val) ? "" : "Hanya boleh angka"),

  year: (val) => {
    if (!/^\d{4}$/.test(val)) return "Format tahun harus 4 digit";
    const year = parseInt(val, 10);
    const currentYear = new Date().getFullYear();
    if (year < 1900 || year > currentYear + 10) return "Tahun tidak valid";
    return "";
  },

  password: (val) => {
    if (val.length < 8) return "Minimal 8 karakter";
    if (!/[A-Z]/.test(val)) return "Harus mengandung huruf besar";
    if (!/\d/.test(val)) return "Harus mengandung angka";
    return "";
  },
  filePdf: (file) => {
    const allowed = ["pdf"];
    const ext = file.name.split(".").pop().toLowerCase();
    return allowed.includes(ext) ? "" : "File harus format PDF";
  },

  fileExcel: (file) => {
    const allowed = ["xls", "xlsx"];
    const ext = file.name.split(".").pop().toLowerCase();
    return allowed.includes(ext) ? "" : "File harus format Excel (xls/xlsx)";
  },

  fileWord: (file) => {
    const allowed = ["doc", "docx"];
    const ext = file.name.split(".").pop().toLowerCase();
    return allowed.includes(ext) ? "" : "File harus format Word (doc/docx)";
  },
};

export function formatUrlPathToTitle(url) {
  if (!url) return "";

  const segments = url.split("/");
  const lastSegment = segments[segments.length - 1];

  const abbreviationMap = {
    spp: "SPP",
  };

  const formatted = lastSegment
    .split("-")
    .map((word) => {
      if (abbreviationMap[word.toLowerCase()]) {
        return abbreviationMap[word.toLowerCase()];
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");

  return formatted;
}

export const combineValidators =
  (...fns) =>
  (val) => {
    for (const fn of fns) {
      const result = fn(val);
      if (result) return result;
    }
    return "";
  };

export const buildQueryString = (params = {}) => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.append(key, value);
    }
  });

  return query.toString(); // returns a=b&c=d
};

export function filterDataByCode(dataArray, targetCode) {
  // Validate that dataArray is actually an array
  if (!Array.isArray(dataArray)) {
    throw new Error("First argument must be an array.");
  }

  // Validate that targetCode is a number
  if (typeof targetCode !== "number") {
    throw new Error("Target code must be a number.");
  }

  // Filter and return items where item's code exactly equals the targetCode
  return dataArray.filter((item) => item.code === targetCode);
}
