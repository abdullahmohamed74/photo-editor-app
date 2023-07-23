import { Controls, EditorPanel, PreviewImage } from './components';
import useGeneralContext from './hooks/useGeneralContext';

function App() {
  const { uploadedImage } = useGeneralContext();

  return (
    <main>
      <section className={`container ${uploadedImage ? '' : 'disable'}`}>
        <h1>easy image editor</h1>

        <div className="wrapper">
          <EditorPanel />
          <PreviewImage />
        </div>

        <Controls />
      </section>
    </main>
  );
}

export default App;
