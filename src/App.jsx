import { useRef, useState } from "react";

function App() {
  const fileInputRef = useRef(null);
  const [manualValue, setManualValue] = useState("");
  const [result, setResult] = useState("");

  const handleScanClick = () => {
    // trigger kamera (via file input)
    if (fileInputRef.current) {
      fileInputRef.current.value = null; // reset pilihan lama
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // di sini nanti bisa kamu kirim ke backend / library QR
    setResult(`File dari kamera: ${file.name}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!manualValue.trim()) return;

    // logic submit manual
    setResult(`http://192.168.100.40/MBKAdmin/Register.aspx?id=${manualValue}`);
    window.open(`http://10.39.38.14/MBKAdmin/Register.aspx?id=${manualValue}`, "_blank")
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="flex flex-col items-center gap-6">

        <h1 className="text-2xl sm:text-3xl font-semibold text-slate-500 uppercase tracking-wider mb-3">
          REGISTRASI KEHADIRAN
        </h1>

        {/* Scan button gede */}
        <button
          onClick={handleScanClick}
          className="px-10 py-5 text-xl font-bold rounded-2xl bg-emerald-500 text-white active:bg-emerald-600 shadow-lg"
        >
          Scan
        </button>

        {/* OR */}
        <div className="flex items-center gap-3 w-full justify-center">
          <div className="h-px w-16 bg-slate-400" />
          <span className="text-sm text-slate-500 uppercase">or</span>
          <div className="h-px w-16 bg-slate-400" />
        </div>

        {/* Input TIDAK full width */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-3"
        >
          <input
            type="number"
            placeholder="Input REG number"
            value={manualValue}
            onChange={(e) => setManualValue(e.target.value)}
            className="w-40 py-2 px-3 border border-slate-300 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <button
            type="submit"
            className="px-8 py-3 rounded-xl bg-blue-500 text-white font-semibold active:bg-blue-600 shadow"
          >
            Submit
          </button>
        </form>

        {/* Hasil */}
        {result && (
          <div className="mt-2 text-xs text-slate-600 text-center max-w-xs break-words">
            <span className="font-semibold">Url: </span>
            {result}
          </div>
        )}

        {/* Hidden input buat buka kamera di HP */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}

export default App;
