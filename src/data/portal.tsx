import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import studentPhoto from '@/assets/yaswanth-student.jpg.asset.json';

export type Profile = { name: string; studentId: string; className: string; branch: string; semester: string; subject: string; subjectCode: string; lecturer: string; linkedin: string; github: string; leetcode: string; photo: string };
export type Experiment = { id: string; number: string; title: string; objective: string; description: string; date: string; code: string; output: string; remarks: string; status: 'Completed' | 'In progress'; requirements: string; procedure: string; language: string; demo?: boolean };
export const defaultProfile: Profile = { name: 'P YASWANTH', studentId: '24102A030093', className: 'DS2', branch: 'Data Science', semester: '5th semester', subject: 'Data Science', subjectCode: '22DS102006', lecturer: 'S BosuBabu', linkedin: 'https://www.linkedin.com/in/yaswanth-pasam-434857312/', github: 'https://github.com/yaswanth9-p', leetcode: '', photo: studentPhoto.url };
export const initialExperiments: Experiment[] = [
  { id: 'introduction-to-iot', number: '01', title: 'Introduction to IoT', objective: 'Understand the fundamental architecture and applications of the Internet of Things.', description: 'Exploring the building blocks of a connected world.', date: '2026-09-15', code: 'const device = {\n  name: "Lab sensor",\n  connected: true,\n};\n\nconsole.log("Hello, connected world!");\nconsole.log(device);', output: 'Hello, connected world!\n{ name: "Lab sensor", connected: true }', remarks: 'Successfully explored the basic components of an IoT system.', status: 'Completed', requirements: 'Computer\nJavaScript runtime\nInternet connection', procedure: '1. Identify sensors, devices and gateways.\n2. Create a simple device representation.\n3. Execute the program and observe the output.', language: 'javascript', demo: true },
  { id: 'led-blinking', number: '02', title: 'LED Blinking with Arduino', objective: 'Control a digital output using an Arduino board.', description: 'A first step into physical computing with Arduino.', date: '2026-09-22', code: 'void setup() {\n  pinMode(LED_BUILTIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(LED_BUILTIN, HIGH);\n  delay(1000);\n  digitalWrite(LED_BUILTIN, LOW);\n  delay(1000);\n}', output: 'The built-in LED turns on and off at one-second intervals.', remarks: 'The LED blinked at the expected interval.', status: 'Completed', requirements: 'Arduino Uno\nUSB cable\nArduino IDE', procedure: '1. Connect the Arduino board.\n2. Upload the sketch.\n3. Observe the built-in LED.', language: 'cpp', demo: true },
  { id: 'temperature-monitoring', number: '03', title: 'Temperature Monitoring', objective: 'Read temperature and humidity data from a DHT11 sensor.', description: 'Turning real-world sensor data into useful insights.', date: '2026-09-29', code: '#include <DHT.h>\n\nDHT dht(2, DHT11);\n\nvoid setup() {\n  Serial.begin(9600);\n  dht.begin();\n}\n\nvoid loop() {\n  Serial.println(dht.readTemperature());\n  delay(2000);\n}', output: '24.00\n24.00\n25.00', remarks: 'Sensor readings were successfully displayed in the serial monitor.', status: 'In progress', requirements: 'Arduino Uno\nDHT11 sensor\nJumper wires', procedure: '1. Connect the sensor to digital pin 2.\n2. Install the DHT library.\n3. Upload the program and inspect the serial monitor.', language: 'cpp', demo: true },
];
type PortalContext = { profile: Profile; experiments: Experiment[]; theme: string; ready: boolean; saveProfile: (profile: Profile) => boolean; addExperiment: (experiment: Experiment) => boolean; toggleTheme: () => void; error: string };
const Context = createContext<PortalContext | null>(null);
export function PortalProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState(defaultProfile);
  const [experiments, setExperiments] = useState(initialExperiments);
  const [theme, setTheme] = useState('light');
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem('mbu-profile');
      const savedExperiments = localStorage.getItem('mbu-experiments');
      if (savedProfile) {
        const saved = JSON.parse(savedProfile);
        const merged = { ...defaultProfile };
        for (const key of Object.keys(defaultProfile) as (keyof Profile)[]) {
          const value = saved?.[key];
          if (typeof value === 'string' && value.trim() && !/^\[.*\]$/.test(value) && !(key === 'branch' && value === 'CSE – Data Science')) merged[key] = value;
        }
        setProfile(merged);
      }
      if (savedExperiments) { const value = JSON.parse(savedExperiments); if (Array.isArray(value)) setExperiments(value); }
      setTheme(localStorage.getItem('mbu-theme') === 'dark' ? 'dark' : 'light');
    } catch { setError('Saved information could not be read. Your browser storage may be unavailable.'); }
    setReady(true);
  }, []);
  useEffect(() => { document.documentElement.classList.toggle('dark', theme === 'dark'); }, [theme]);
  const persist = (key: string, value: unknown) => { try { localStorage.setItem(key, JSON.stringify(value)); setError(''); return true; } catch { setError('Unable to save. Please allow browser storage or free up space and try again.'); return false; } };
  const saveProfile = (value: Profile) => { if (!persist('mbu-profile', value)) return false; setProfile(value); return true; };
  const addExperiment = (value: Experiment) => { const next = [...experiments, value]; if (!persist('mbu-experiments', next)) return false; setExperiments(next); return true; };
  const toggleTheme = () => { const next = theme === 'light' ? 'dark' : 'light'; setTheme(next); try { localStorage.setItem('mbu-theme', next); } catch { setError('Theme preference cannot be saved in this browser.'); } };
  return <Context.Provider value={{ profile, experiments, theme, ready, saveProfile, addExperiment, toggleTheme, error }}>{children}</Context.Provider>;
}
export function usePortal() { const context = useContext(Context); if (!context) throw new Error('Portal provider is required'); return context; }
export function readableDate(date: string) { if (!date) return 'Date not provided'; return new Date(`${date}T12:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }); }
export function pageHead(title: string, description: string) { return { meta: [{ title: `${title} — Mohan Babu University` }, { name: 'description', content: description }, { property: 'og:title', content: `${title} — Mohan Babu University` }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }; }
