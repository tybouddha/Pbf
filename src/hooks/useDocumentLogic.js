import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  documentModalRestOuvert,
  doucumentModalResterFermer,
  sauvgaurderDocumentInfos,
  supprimerTousLesPhotos,
} from "../../reducers/document";

export const useDocumentLogic = (navigation) => {
  const userRedux = useSelector((state) => state.user.value);
  const documentRedux = useSelector((state) => state.document.value);
  const dispatch = useDispatch();

  const [documentsDonnes, setDocumentsDonnes] = useState([]);
  const [documentsDonnesRecherche, setDocumentsDonnesRecherche] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [photoModalVisible, setPhotoModalVisible] = useState(false);
  const [documentChoisi, setDocumentChoisi] = useState(null);
  const [afficherRechercheScrollView, setAfficherRechercheScrollView] =
    useState(false);

  const fetchData = () => {
    fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/document/${userRedux.tokenProject}`
    )
      .then((response) => response.json())
      .then((data) => {
        const array = data.documentsData || [];
        setDocumentsDonnes(array);
        setDocumentsDonnesRecherche(array);
      })
      .catch((error) => console.error("Erreur fetchData :", error));
  };

  useEffect(() => {
    fetchData();
  }, [userRedux.tokenProject]);

  const fermerModalVwAjouterDoc = () => {
    dispatch(sauvgaurderDocumentInfos({ nom: "", practcien: "", notes: "" }));
    dispatch(supprimerTousLesPhotos());
    dispatch(doucumentModalResterFermer());
  };

  const cameraScreenFermerModalSansEffacerRedux = () => {
    dispatch(doucumentModalResterFermer());
  };

  const poubelleAppuyee = (elem) => {
    if (userRedux.role !== "lecteur") {
      fetch(`${process.env.EXPO_PUBLIC_API_URL}/document/${elem._id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) fetchData();
        })
        .catch((error) =>
          console.error("Erreur lors de la suppression :", error)
        );
    } else {
      alert("c'est chitos mon acces est bloqué");
    }
  };

  const searchDocuments = () => {
    setAfficherRechercheScrollView(true);
    const normalizedSearch = searchInput.trim().toLowerCase();
    const newDocumentsDonnes = documentsDonnes.filter((doc) =>
      [doc.nom, doc.practicien, doc.notes, doc.dateAjoute].some((field) =>
        field?.toLowerCase().includes(normalizedSearch)
      )
    );
    setDocumentsDonnesRecherche(newDocumentsDonnes);
  };

  const appuyerPhoto = (doc) => {
    setDocumentChoisi(doc);
    setPhotoModalVisible(true);
  };

  const ouvrirModalAjoutDocument = () => {
    if (userRedux.role !== "lecteur") {
      dispatch(documentModalRestOuvert());
    } else {
      alert("c'est chitos mon acces est bloqué");
    }
  };

  const fermerSearchModal = () => {
    setSearchModalVisible(false);
    setAfficherRechercheScrollView(false);
    setSearchInput("");
  };

  return {
    userRedux,
    documentRedux,
    documentsDonnes,
    documentsDonnesRecherche,
    searchInput,
    searchModalVisible,
    photoModalVisible,
    documentChoisi,
    afficherRechercheScrollView,
    setSearchInput,
    setSearchModalVisible,
    setPhotoModalVisible,
    fetchData,
    fermerModalVwAjouterDoc,
    cameraScreenFermerModalSansEffacerRedux,
    poubelleAppuyee,
    searchDocuments,
    appuyerPhoto,
    ouvrirModalAjoutDocument,
    fermerSearchModal,
  };
};
