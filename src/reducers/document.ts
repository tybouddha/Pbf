// src/reducers/document.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Interface pour un document individuel (pour les photos)
interface DocumentPhoto {
  id: string; // Ajouté pour identifier chaque photo
  url: string; // Exemple : URL ou chemin de la photo
}

// Interface pour l'état du document
interface DocumentState {
  value: {
    nom: string | null;
    practicien: string | null;
    notes: string | null;
    photos: DocumentPhoto[]; // Typé comme tableau d'objets
    modalOuvert: boolean;
  };
}

// État initial typé
const initialState: DocumentState = {
  value: {
    nom: null,
    practicien: null,
    notes: null,
    photos: [],
    modalOuvert: false,
  },
};

// Interface pour le payload de sauvegarderDocumentInfos
interface DocumentPayload {
  nom: string;
  practicien: string;
  notes: string;
}

// Interface pour le payload d'une photo (ajouterPhoto)
interface PhotoPayload {
  id: string;
  url: string;
}

export const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {
    sauvegarderDocumentInfos: (
      state,
      action: PayloadAction<DocumentPayload>
    ) => {
      state.value.nom = action.payload.nom;
      state.value.practicien = action.payload.practicien;
      state.value.notes = action.payload.notes;
    },
    documentModalRestOuvert: (state) => {
      state.value.modalOuvert = true;
    },
    documentModalResterFermer: (state) => {
      state.value.modalOuvert = false;
    },
    ajouterPhoto: (state, action: PayloadAction<PhotoPayload>) => {
      state.value.photos.push(action.payload);
    },
    supprimerPhoto: (state, action: PayloadAction<PhotoPayload>) => {
      state.value.photos = state.value.photos.filter(
        (photo) => photo.id !== action.payload.id // Comparaison par id
      );
    },
    supprimerTousLesPhotos: (state) => {
      state.value.photos = [];
    },
    logOutDocument: (state) => {
      state.value.nom = null;
      state.value.notes = null;
      state.value.photos = [];
      state.value.practicien = null;
      state.value.modalOuvert = false;
    },
  },
});

export const {
  sauvegarderDocumentInfos,
  documentModalRestOuvert,
  documentModalResterFermer,
  ajouterPhoto,
  supprimerPhoto,
  supprimerTousLesPhotos,
  logOutDocument,
} = documentSlice.actions;

export default documentSlice.reducer;

// Export des types pour réutilisation
export type { DocumentState, DocumentPhoto };
