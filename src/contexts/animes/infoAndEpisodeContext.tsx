import { createContext, useContext, useEffect, useState } from "react";
import {
  EpisodeNameValidate,
  EpisodeNameValidateOva,
} from "../../config/episodesFunctions";
import { genericApiRequest } from "../../config/genericApiResquest";
import {
  AnimeEpisodeResultsInterface,
  AnimeInfoResultsInteface,
  EpisodesResultsInterface,
  InfoAndEpisodeContextComponentsInterface,
  InfoAndEpisodeContextInterface,
} from "../../interfaces/animes/infoContextInterface";
import { GlobalContext } from "../globalContext";

export const InfoAndEpisodeContext =
  createContext<InfoAndEpisodeContextInterface>(
    {} as InfoAndEpisodeContextInterface
  );

export const InfoAndEpisodeContextComponent = ({
  children,
}: InfoAndEpisodeContextComponentsInterface) => {
  const { episodeId, animeIdInfo } = useContext(GlobalContext);

  const [animeInfo, setAnimeInfo] = useState<AnimeInfoResultsInteface[]>(
    [] as AnimeInfoResultsInteface[]
  );
  const [listEpisodes, setListEpisode] = useState<EpisodesResultsInterface[]>(
    [] as EpisodesResultsInterface[]
  );
  const [loadingInfo, setLoadingInfo] = useState(true);
  const [servidorEpisode, setServidorEpisode] = useState("vidcdn");
  const [episodesResults, setEpisodesResults] = useState<
    AnimeEpisodeResultsInterface[]
  >([] as AnimeEpisodeResultsInterface[]);
  const [loadingEp, setLoadingEp] = useState(true);
  const [loadingInfoEp, setloadingInfoEp] = useState(true);
  const [nextEp, setNetxEp] = useState<AnimeEpisodeResultsInterface[]>(
    [] as AnimeEpisodeResultsInterface[]
  );
  const [previosEp, setPreviosEp] = useState<AnimeEpisodeResultsInterface[]>(
    [] as AnimeEpisodeResultsInterface[]
  );


  useEffect(() => {
    setLoadingInfo(true);
    setloadingInfoEp(true);

    animeIdInfo !== "" &&
      animeIdInfo != "undefined" &&
      genericApiRequest({
        restLink: `?info=${animeIdInfo}`,
        dataBase: setAnimeInfo,
      }).finally(() => setLoadingInfo(false));

    setloadingInfoEp(true);
    animeIdInfo !== "" &&
      genericApiRequest({
        restLink: `?cat_id=${animeIdInfo}`,
        dataBase: setListEpisode,
      }).finally(() => {
        setloadingInfoEp(false);
      });
  }, [animeIdInfo]);

  useEffect(() => {
    setLoadingEp(true);

    episodeId !== "" &&
      episodeId != "undefined" &&
      genericApiRequest({
        restLink: `?episodios=${episodeId}`,
        dataBase: setEpisodesResults,
      }).finally(() => setloadingInfoEp(false));
  }, [episodeId, servidorEpisode]);

  useEffect(() => {
    !loadingInfo &&
      !loadingInfoEp &&
      episodesResults.length != 0 &&
      setLoadingEp(false);
  }, [loadingInfo, loadingInfoEp, episodeId, episodesResults]);

  useEffect(() => {
    episodeId !== "" &&
      episodeId != "undefined" &&
      genericApiRequest({
        restLink: `?episodios=${episodeId}&catid=${animeIdInfo}&next`,
        dataBase: setNetxEp,
      });
  }, [nextEp, episodeId]);

  useEffect(() => {
    episodeId !== "" &&
      episodeId != "undefined" &&
      genericApiRequest({
        restLink: `?episodios=${episodeId}&catid=${animeIdInfo}&previous`,
        dataBase: setPreviosEp,
      });
  }, [previosEp, episodeId]);

  return (
    <InfoAndEpisodeContext.Provider
      value={{
        animeInfo,
        episodesResults,
        loadingEp,
        loadingInfo,
        loadingInfoEp,
        nextEp,
        previosEp,
        listEpisodes,
        setLoadingInfo,
        setNetxEp,
        setPreviosEp,
        setServidorEpisode,
      }}
    >
      {children}
    </InfoAndEpisodeContext.Provider>
  );
};
