import { useCallback, useEffect } from 'react';
import debounce from 'lodash.debounce';
import { save } from '../../services/api'

const DEBOUNCE_SAVE_DELAY_MS = 500;

export default function Autosave({ link, text, isSaving, setIsSaving }) {
  // This is the side effect we want to run on users' changes.
  // In this example, we persist the changes in the localStorage.
  const saveExperimentData = useCallback(newText => {
    // Adding "isSaving" to have a visual feedback.
    setIsSaving(true)
    save(link, newText).then(() => setIsSaving(false));
  }, []);

  const debouncedSave = useCallback(
    debounce(async (newText) => {
      if (text !== newText) {
        saveExperimentData(newText)
      }
    }, DEBOUNCE_SAVE_DELAY_MS),
    []
  );

  // The magic useEffect hook. This runs only when `experimentData.name` changes.
  // We could add more properties, should we want to listen for their changes.
  useEffect(() => {
    if (text) {
      debouncedSave(text);
    }
  }, [text, debouncedSave]);

  // Do not display anything on the screen.
  return null;
}
