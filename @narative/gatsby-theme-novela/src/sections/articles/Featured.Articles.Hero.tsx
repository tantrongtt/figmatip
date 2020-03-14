import React, { useContext } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from '@emotion/styled';
import { Link } from 'gatsby';

import Image from '@components/Image';
import Section from '@components/Section';
import mediaqueries from '@styles/media';
import { IAuthor } from '@types';
import Icons from "@icons";

import { GridLayoutContext } from './Articles.List.Context';

const myQuery = graphql`
  {
    site: allSite {
      edges {
        node {
          siteMetadata {
            hero {
              writingHeading
            }
          }
        }
      }
    }
  }
`;


const FeaturedArticlesHero: React.FC<IAuthor> = ({ authors }) => {
  const { gridLayout = 'tiles', hasSetGridLayout, setGridLayout } = useContext(
    GridLayoutContext,
  );

  const results = useStaticQuery(myQuery);
  const hero = results.site.edges[0].node.siteMetadata.hero;
  
  return (
    <HeroContainer>
      <TextWrap>
        <Section narrow id="Articles__Hero">
          <HeroContent>
            <HeadingContainer>
              <HeroHeading dangerouslySetInnerHTML={{ __html: hero.writingHeading }} />
              <InfoText>
                Small but awesome tips to work faster in Figma.
              </InfoText>
            </HeadingContainer>
            <Logo>
              <Icons.FigmatipLogo />
            </Logo>
          </HeroContent>
        </Section>
      </TextWrap>
      {/* <ImageWrap>
        <Image
          src={heroImage}
        />
      </ImageWrap> */}
    </HeroContainer>
  );
};

export default FeaturedArticlesHero;

const HeroContainer = styled.div`
  position: relative;
  display: block;
  overflow: hidden;
  margin-top: -100px;
  height: 800px;
  background-image: url("/site-hero.jpg");
  // background-image: ${p => p.theme.colors.heroBackground};
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: cover;


  ${mediaqueries.tablet`
    height: 536px;
  `}

`;

const ImageWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;

  & > div {
    height: 100%;
  }

  &::before {
    content: "";
    display: block;
    position: absolute;
    z-index: 1;
    pointer-events: none;
    width: 100%;
    height: 140px;
    bottom: 0;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    background-repeat: no-repeat;
    background-image: linear-gradient(180deg, rgba(9, 10, 11, 0) 0%, #090A0B 100%);

  }
`;

const TextWrap = styled.div`
  position: relative;
  z-index: 2;
`;

const HeroContent = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 0;

  ${mediaqueries.tablet`
    grid-template-columns: 1fr;
  `}

`;

const HeadingContainer = styled.div`
  margin: 280px 0 40px;
  
  ${mediaqueries.tablet`
    width: 100%;
    margin-top: 200px;
  `}
`;

const Logo = styled.div`
  position: relative;
  width: 504px;
  justify-self: center;
  margin-top: 136px;

  ${mediaqueries.tablet`
   display: none;
  `}
`;
  
const HeroHeading = styled.h1`
  font-style: normal;
  font-weight: ${p => p.theme.fontsWeight.bold};
  font-size: 64px;
  line-height: 1.15;
  font-family: ${p => p.theme.fonts.title};
  color: transparent;
  -webkit-background-clip: text;
  background-image: linear-gradient(92.72deg, #E0EBF2 4.64%, #F2B5B0 87.93%);

  a {
    color: ${p => p.theme.colors.accent};
  }

  ${mediaqueries.desktop`
    font-size: 48px
  `}

  ${mediaqueries.tablet`
    font-size: 44px;
    text-align: center;
  `}
`;

const InfoText = styled.p`
  font-size: 18px;
  margin-top: 16px;
  line-height: 1.5;
  font-family: ${p => p.theme.fonts.body};
  color: ${p => p.theme.colors.secondary};

  ${mediaqueries.tablet`
    text-align: center;
  `}
`;

const Anchor = styled(Link)`
  color: ${p => p.theme.colors.secondary};
  border-bottom: 1px solid ${p => p.theme.colors.secondary};
  margin-left: 6px;

  &:hover,
  &:focus {
    color: ${p => p.theme.colors.accent};
    border-bottom-color: ${p => p.theme.colors.accent};
  }
`;