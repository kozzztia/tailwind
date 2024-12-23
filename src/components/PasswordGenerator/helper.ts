export const generatePassword = (length: number, settings: { lowercase: boolean; uppercase: boolean; numbers: boolean; symbols: boolean }) => {
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let chars = "";
    if (settings.lowercase) chars += lowercaseChars;
    if (settings.uppercase) chars += uppercaseChars;
    if (settings.numbers) chars += numberChars;
    if (settings.symbols) chars += symbolChars;

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      newPassword += chars.charAt(randomIndex);
    }
    if(newPassword.length === 0){
      newPassword = "--insetr settings--"
    }
    return newPassword;
  };