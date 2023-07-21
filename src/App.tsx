import { Header } from './components/Header';
import { Instructions } from './components/Instructions';
import { CardGrid } from './components/CardGrid';

function App() {
    return (
        <div className="flex flex-col items-center min-h-screen text-center font-raleway bg-orange-50">
            <Header />
            <main className="flex-1 w-full p-8">
                <Instructions />
                <CardGrid />
            </main>
        </div>
    );
}

export default App;
