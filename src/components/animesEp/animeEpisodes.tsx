import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  descendingOrGrowingList,
  EpisodeNameValidate,
  EpisodeNameValidateOva,
  existOvaEp,
  verifyOvaOrEpecial,
} from "../../config/episodesFunctions";
import { EpisodesResultsInterface } from "../../interfaces/animes/infoContextInterface";
import { AnimeEpisodesListInterface } from "../../interfaces/animesComponentsInterface/animesCarouselInterface";
import { EpConteiner, EpItem } from "./styled";

export const AnimeEpisodesList = ({
  eplist,
  animeTitle,
}: AnimeEpisodesListInterface) => {
  const navigate = useNavigate();
  const [episodesList, setepisodesList] = useState<EpisodesResultsInterface[]>(
    [] as EpisodesResultsInterface[]
  );
  const [episodeListEspecial, setEpisodeListEspecial] = useState<
    EpisodesResultsInterface[]
  >([] as EpisodesResultsInterface[]);
  const [type, setType] = useState("");

  useEffect(() => {
    episodesList.length == 0 && setepisodesList(EpisodeNameValidate(eplist));
    episodeListEspecial.length == 0 && setEpisodeListEspecial(EpisodeNameValidateOva(eplist, animeTitle));

    episodesList.length != 0 &&
      setepisodesList(descendingOrGrowingList(episodesList, type));
    episodeListEspecial.length != 0 &&
      setEpisodeListEspecial(
        descendingOrGrowingList(episodeListEspecial, type)
      );
  }, [type]);

  return (
    <EpConteiner>
      <div>
        <h2>Lista Episodios</h2>
        <div>
          <input type="text" placeholder="pesquise pelo anime" />
          <button
            onClick={() => {
              setType("asc");
            }}
          >
            Crescente
          </button>
          <button
            onClick={() => {
              setType("desc");
            }}
          >
            Decrescente
          </button>
        </div>

        {eplist.length !== undefined && (
          <EpItem>
            {episodesList.map((elem) => {
              return (
                !verifyOvaOrEpecial(elem.title) && (
                  <li
                    style={{ color: "white" }}
                    onClick={() => {
                      navigate(
                        `/anime/episode/${elem.video_id}/${elem.category_id}`
                      );
                    }}
                  >
                    <h4>{elem.title}</h4>
                  </li>
                )
              );
            })}
          </EpItem>
        )}
      </div>
      {existOvaEp(episodeListEspecial) && (
        <div>
          <h2>Lista de Ovas</h2>
          {eplist.length !== undefined && (
            <EpItem>
              {episodeListEspecial.map((elem) => {
                return (
                  <li
                    style={{ color: "white" }}
                    onClick={() => {
                      navigate(
                        `/anime/episode/${elem.video_id}/${elem.category_id}`
                      );
                    }}
                  >
                    <h4>{elem.title}</h4>
                  </li>
                );
              })}
            </EpItem>
          )}
        </div>
      )}
    </EpConteiner>
  );
};
