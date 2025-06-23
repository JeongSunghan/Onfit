import * as Location from "expo-location";

export async function getCityFromCoords(location: { latitude: number; longitude: number }) {
  try {
    const { latitude, longitude } = location;
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
    );
    const data = await response.json();
    console.log("Nominatim reverseGeocode 결과:", data);
    
    if (data && data.address) {
      return data.address.city || data.address.town || data.address.village || data.address.state || "알 수 없음";
    }
    return "알 수 없음";
  } catch (error) {
    console.error("도시명 가져오기 실패:", error);
    return "알 수 없음";
  }
}

