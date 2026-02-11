import styled from "@emotion/styled";
import { breakpoints, colors } from "../../styles/variables";
import { getRemSize } from "../../styles/globalCss";
import ArrowUpRight from "../../icons/arrowUpRight";
import { SkillCategoriesNode } from "@/interfaces/home";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

const StyledSection = styled.section`
  background: ${colors.black};
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 200px 32px;
  display: flex;
  gap: 20px;
  align-items: flex-start;

  @media all and (max-width: 1200px) {
    gap: 32px;
    padding: 150px 24px;
  }

  @media all and (max-width: ${breakpoints.md}px) {
    flex-direction: column;
    padding: 80px 0;
    gap: 40px;
  }
`;

const StyledHeadingWrapper = styled.div`
  position: sticky;
  top: 0;
  padding-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  @media all and (max-width: ${breakpoints.md}px) {
    position: sticky;
    top: 0px;
    padding-top: 80px;
    text-align: center;
    margin-bottom: 30px;
    z-index: 10;
    backdrop-filter: blur(9px);
    background: rgba(29, 29, 29, 0.8);
    padding-bottom: 20px;
  }
`;

const StyledHeading = styled.h2`
  font-size: ${getRemSize(66)};
  line-height: 1;
  margin: 0;
  color: ${colors.white};
  letter-spacing: 0.66px;
  width: 591px;
  flex-shrink: 0;
  white-space: pre-wrap;

  @media all and (max-width: 1200px) {
    font-size: ${getRemSize(52)};
    width: 450px;
  }

  @media all and (max-width: ${breakpoints.md}px) {
    font-size: ${getRemSize(36)};
    width: 100%;
    line-height: 1.2;
  }

  @media all and (max-width: ${breakpoints.sm}px) {
    font-size: ${getRemSize(28)};
  }
`;

const StyledClientsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
  min-width: 0;
  justify-content: center;
  width: 100%;
`;

const StyledClientsList = styled.div`
  display: flex;
  flex-direction: column;
  @media all and (max-width: ${breakpoints.md}px) {
    margin: 0 40px;
  }
`;

const StyledClientRow = styled.div<{ hasLink: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-left: 20px;
  border-radius: 20px;
  transition: background 0.3s ease;
  margin: 10px 0;
  cursor: ${(props) => (props.hasLink ? "pointer" : "default")};
  text-decoration: none;

  &:hover {
    background: rgba(57, 151, 156, 0.2);
  }

  @media all and (max-width: ${breakpoints.md}px) {
    padding-left: 0;
    padding-right: 0;
    margin: 6px 0;
    border-radius: 0;
  }
`;

const StyledClientName = styled.p`
  font-size: ${getRemSize(46)};
  line-height: 1;
  color: ${colors.white};
  letter-spacing: 0.46px;
  flex-shrink: 1;
  min-width: 0;

  @media all and (max-width: 1200px) {
    font-size: ${getRemSize(36)};
  }

  @media all and (max-width: ${breakpoints.md}px) {
    font-size: ${getRemSize(24)};
  }

  @media all and (max-width: ${breakpoints.sm}px) {
    font-size: ${getRemSize(20)};
  }
`;

const StyledClientLogoAndArrow = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-left: auto;
  position: relative;
`;

const StyledClientLogo = styled(motion.div)`
  width: 103px;
  height: 103px;
  flex-shrink: 0;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media all and (max-width: ${breakpoints.md}px) {
    width: 60px;
    height: 60px;
  }
`;

const StyledArrowIcon = styled(motion.div)`
  width: 53px;
  height: 53px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0;
  pointer-events: none;

  svg {
    width: 30px;
    height: 30px;
  }

  @media all and (max-width: ${breakpoints.md}px) {
    width: 30px;
    height: 30px;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const StyledDivider = styled.div`
  height: 1px;
  width: 100%;
  background: rgba(255, 255, 255, 0.2);
`;

const StyledCTA = styled(motion.a)`
  backdrop-filter: blur(9px);
  background: rgba(255, 255, 255, 0.06);
  display: flex;
  height: 103px;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px 8px 24px;
  border-radius: 20px;
  width: 100%;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.3s ease;

  @media all and (max-width: ${breakpoints.md}px) {
    height: 80px;
    padding: 8px 12px 8px 16px;
    margin: 0 20px;
    width: calc(100% - 40px);
  }
`;

const StyledCTAText = styled.p`
  margin: 0;
  font-size: ${getRemSize(46)};
  line-height: 1;
  color: ${colors.white};
  letter-spacing: 0.46px;
  flex-shrink: 0;

  @media all and (max-width: 1200px) {
    font-size: ${getRemSize(36)};
  }

  @media all and (max-width: ${breakpoints.md}px) {
    font-size: ${getRemSize(32)};
  }
  @media all and (max-width: ${breakpoints.sm}px) {
    font-size: ${getRemSize(24)};
  }
`;

const StyledCTAButton = styled(motion.div)`
  background: ${colors.white};
  border: 2px solid rgba(29, 29, 29, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 14px;
  border-radius: 20px;
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  position: relative;

  @media all and (max-width: ${breakpoints.md}px) {
    width: 60px;
    height: 60px;
    padding: 15px 10px;
  }
`;

const StyledCTAIconWrapper = styled(motion.div)`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface IClients {
  skillCategory: SkillCategoriesNode;
  ctaLink?: string;
}

function Clients({ skillCategory, ctaLink = "/projects" }: IClients) {
  const { name, description, skills } = skillCategory;
  const [isCTAHovered, setIsCTAHovered] = useState(false);

  return (
    <StyledSection>
      <StyledHeadingWrapper>
        <StyledHeading>{description}</StyledHeading>
      </StyledHeadingWrapper>

      <StyledClientsWrapper>
        <StyledClientsList>
          {skills.nodes.map((client, index) => {
            const projectUri =
              client.skillsFields?.project?.edges?.[0]?.node?.slug;
            const externalLink = client.skillsFields?.link;
            const hasLink = !!(projectUri || externalLink);

            return (
              <ClientRow
                key={client.title}
                client={client}
                hasLink={hasLink}
                projectUri={projectUri}
                externalLink={externalLink}
                showDivider={index < skills.nodes.length - 1}
              />
            );
          })}
        </StyledClientsList>

        <StyledCTA
          href={ctaLink}
          onMouseEnter={() => setIsCTAHovered(true)}
          onMouseLeave={() => setIsCTAHovered(false)}
          animate={{
            background: isCTAHovered
              ? "rgba(57, 151, 156, 0.2)"
              : "rgba(255, 255, 255, 0.06)",
          }}
          transition={{ duration: 0.2 }}
        >
          <StyledCTAText>Read through our work</StyledCTAText>
          <StyledCTAButton
            animate={{
              background: isCTAHovered ? colors.accent : colors.white,
              borderColor: isCTAHovered
                ? "rgba(57, 151, 156, 0.1)"
                : "rgba(29, 29, 29, 0.1)",
            }}
            transition={{ duration: 0.2 }}
          >
            <StyledCTAIconWrapper
              animate={{
                rotate: isCTAHovered ? 45 : 0,
              }}
              transition={{
                type: "tween",
                duration: 0.2,
                ease: "easeOut",
              }}
            >
              <ArrowUpRight fill={colors.black} />
            </StyledCTAIconWrapper>
          </StyledCTAButton>
        </StyledCTA>
      </StyledClientsWrapper>
    </StyledSection>
  );
}

interface ClientRowProps {
  client: any;
  hasLink: boolean;
  projectUri?: string;
  externalLink?: string;
  showDivider: boolean;
}

function ClientRow({
  client,
  hasLink,
  projectUri,
  externalLink,
  showDivider,
}: ClientRowProps) {
  const [isHovered, setIsHovered] = useState(false);

  const isInternalLink = !!projectUri;
  const href = projectUri ? `/projects/${projectUri}` : externalLink || "#";

  const rowProps = hasLink
    ? isInternalLink
      ? {}
      : {
          href: externalLink,
          target: "_blank",
          rel: "noopener noreferrer",
        }
    : {};

  const RowContent = (
    <StyledClientRow
      as={hasLink && !isInternalLink ? "a" : "div"}
      hasLink={hasLink}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...rowProps}
    >
      <StyledClientName>{client.title}</StyledClientName>
      <StyledClientLogoAndArrow>
        <StyledClientLogo
          animate={{
            x: isHovered && hasLink ? -55 : 0,
          }}
          transition={{
            type: "tween",
            duration: 0.2,
            ease: "easeOut",
          }}
        >
          <img
            src={client.featuredImage.node.sourceUrl}
            alt={`${client.title} logo`}
          />
        </StyledClientLogo>
        <AnimatePresence>
          {hasLink && isHovered && (
            <StyledArrowIcon
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.2,
              }}
            >
              <ArrowUpRight fill={colors.white} />
            </StyledArrowIcon>
          )}
        </AnimatePresence>
      </StyledClientLogoAndArrow>
    </StyledClientRow>
  );

  return (
    <div>
      {hasLink && isInternalLink ? (
        <Link href={href} passHref legacyBehavior>
          <a style={{ textDecoration: "none", color: "inherit" }}>
            {RowContent}
          </a>
        </Link>
      ) : (
        RowContent
      )}
      {showDivider && <StyledDivider />}
    </div>
  );
}

export default Clients;
