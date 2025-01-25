

export const getLocalTime: () => { hour: number; minute: number; second: number; } = () => {
    const date = new Date();
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    return { 
        hour, 
        minute, 
        second };
};

export const getLocalStorageTime: () => { hour: number; minute: number } | null = () => {
    const timer = localStorage.getItem("timer");
    if (!timer) return null;
  
    try {
      const alertTime = JSON.parse(timer);
      if (typeof alertTime.hour === "number" && typeof alertTime.minute === "number") {
        return {
          hour: alertTime.hour,
          minute: alertTime.minute,
        };
      }
    } catch (error) {
      console.error("Failed to parse timer from localStorage:", error);
    }
  
    return null;
  };

export const setLocalStorageTime = (hour: number, minute: number) => {
    const alertTime = { hour, minute};
    localStorage.setItem("timer", JSON.stringify(alertTime));
  };

export const removeLocalStorageTime = () => {
    localStorage.removeItem("timer");
}

export const padedNumber = (num: number) => {
    return num.toString().padStart(2, "0");
}