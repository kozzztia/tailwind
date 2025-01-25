

export const getLocalTime: () => { hour: string; minute: string; second: string; } = () => {
    const date = new Date();
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    const second = date.getSeconds().toString().padStart(2, "0");
    return { 
        hour, 
        minute, 
        second };
};

export const getLocalStorageTime: () => { hour: string; minute: string } | null = () => {
    const timer = localStorage.getItem("timer");
    if (!timer) return null;
  
    try {
      const alertTime = JSON.parse(timer);
      if (typeof alertTime.hour === "number" && typeof alertTime.minute === "number") {
        return {
          hour: alertTime.hour.toString().padStart(2, "0"),
          minute: alertTime.minute.toString().padStart(2, "0"),
        };
      }
    } catch (error) {
      console.error("Failed to parse timer from localStorage:", error);
    }
  
    return null;
  };