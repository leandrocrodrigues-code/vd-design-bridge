import { TWTButton } from '../components/Button';

function App() {
  return (
    <main className="flex min-h-screen items-center justify-center gap-4 p-8">
      <TWTButton Caption="Primary" />
      <TWTButton Caption="Secondary" Variant="Secondary" />
    </main>
  );
}

export default App;
