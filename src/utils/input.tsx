export function Input({ label, error, touched, ...props }: any) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm text-slate-400">{label}</label>
            <div className="relative">
                <input
                    {...props}
                    className={`w-full h-11 px-3 pr-10 rounded-lg bg-[#0f172a] text-[#f1f5f9] border outline-none
            ${touched && error ? "border-red-500" : "border-slate-800 focus:border-indigo-500"}
            transition`}
                />

            </div>
            {touched && error && <p className="text-xs text-red-400">{error}</p>}
        </div>
    );
}