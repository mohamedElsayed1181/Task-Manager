import ThemeToggle from "../ThemeToggle/ThemeToggle";


export default function Header({ theme, setTheme }: any) {
  return (
    <header className="flex items-center justify-between">
      <h1 className="text-2xl font-bold ">Personal Task Manager</h1>
      <div className="flex items-center gap-3">
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </div>
    </header>
  );
}
