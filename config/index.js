import { Platform } from "react-native";


export const API_URL = Platform.OS === 'web' ? "http://localhost:8000" : "http://192.168.0.100:8000";
export const SOCKET_URL = Platform.OS === 'web' ? "ws://localhost:3000" : "ws://192.168.0.100:3000";