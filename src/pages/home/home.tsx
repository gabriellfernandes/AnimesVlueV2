import { Header } from "../../components/header/header";
import { SubHeader } from "./components/subHeader/subMenu";
import { DivHomeConteiner } from "./styled";
import { AnimeContext, ContextAnimes } from "../../contexts/animesContext";
import { AnimesListGeneric } from "./components/animes/animesLIstGeneric";
import { useContext, useEffect, useState } from "react";
import { DivLoading } from "../../components/divLoading/divLoading";
import { DivConteinerAnimes } from "./components/animes/styled";

export const HomePage = () => {
  const { loading } = useContext(AnimeContext);
 
  const [visible, setVisible] = useState("none");

  useEffect(() => {
    !loading ? setVisible("flex") : setVisible("none");
  }, [loading]);

  return (
    <>
      <ContextAnimes key="ContextAnimes">
        <Header key="header" />
        {loading ? (
          <DivHomeConteiner>
            <SubHeader key="subMenu" />
            <DivConteinerAnimes>
              <DivLoading />
            </DivConteinerAnimes>
            <div style={{display: `${visible}`}}>
              <AnimesListGeneric type="recent-episodes" />
              <AnimesListGeneric type="top-airing" />
              <AnimesListGeneric type="dub" />
            </div>
          </DivHomeConteiner>
        ) : (
          <DivHomeConteiner key="DivHomeConteiner">
            <SubHeader key="subMenu" />
            <AnimesListGeneric type="recent-episodes" />
            <AnimesListGeneric type="top-airing" />
            <AnimesListGeneric type="dub" />
          </DivHomeConteiner>
        )}
      </ContextAnimes>
    </>
  );
};
