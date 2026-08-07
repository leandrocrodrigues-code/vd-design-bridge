import { TWTButton } from '../components/Button';
import { TWTCheckBox } from '../components/checkbox';

function App() {
  return (
    <main className="flex min-h-screen items-center justify-center gap-4 p-8">
      <TWTButton Caption="Primary" />
      <TWTButton Caption="Secondary" Style="bsSecondary" />
      <TWTCheckBox Caption="Opção" />
    </main>
  );
}

export default App;
