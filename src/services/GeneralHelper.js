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

export const combineValidators =
  (...fns) =>
  (val) => {
    for (const fn of fns) {
      const result = fn(val);
      if (result) return result;
    }
    return "";
  };
