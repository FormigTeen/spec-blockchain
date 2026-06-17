import React from 'react';
import { createRoot } from 'react-dom/client';
import { motion } from 'framer-motion';
import Latex from 'react-latex-next';
import {
  FaCubes,
  FaExchangeAlt,
  FaEye,
  FaFileContract,
  FaGavel,
  FaHandshake,
  FaNetworkWired,
  FaServer,
  FaShieldAlt,
  FaTachometerAlt,
  FaTools,
  FaUserSecret
} from 'react-icons/fa';
import {
  Box,
  Deck,
  DeckContext,
  FlexBox,
  FullScreen,
  Grid,
  Heading,
  Image,
  ListItem,
  Slide,
  Text,
  UnorderedList
} from 'spectacle';
import 'katex/dist/katex.min.css';
import blockBitcoinImage from './src/assets/block_bitcoin.png';
import capImage from './src/assets/cap.png';
import descentralizedImage from './src/assets/descentralized.png';
import encDecImage from './src/assets/enc_dec.png';
import merkleImage from './src/assets/merkle.png';
import nodeImage from './src/assets/node.png';
import oracleImage from './src/assets/oracle.png';
import posImage from './src/assets/pos.png';
import powImage from './src/assets/pow.png';
import transactionImage from './src/assets/transaction.png';
import validPubImage from './src/assets/valid_pub.png';

const theme = {
  colors: {
    primary: '#E8EDF3',
    secondary: '#060D16',
    tertiary: '#FF7043',
    quaternary: '#45C88C',
    navy: '#060D16',
    ink: '#E8EDF3',
    muted: '#7B90A3',
    paper: '#0D1B2A',
    line: '#1E3348',
    blue: '#4DB8E8',
    green: '#45C88C',
    yellow: '#FFD740',
    red: '#FF6B6B'
  },
  fonts: {
    header: '"Atkinson Hyperlegible Next", system-ui, sans-serif',
    text: '"Atkinson Hyperlegible Next", system-ui, sans-serif'
  },
  fontSizes: {
    h1: '70px',
    h2: '46px',
    h3: '30px',
    text: '24px',
    monospace: '21px'
  }
};

type Tone = 'blue' | 'green' | 'yellow' | 'red';

type Topic = {
  chapter: string;
  title: string;
  subtitle?: React.ReactNode;
  bullets: React.ReactNode[];
  note?: React.ReactNode;
  image?: {
    src: string;
    alt: string;
  };
  customContent?: React.ReactNode;
  tone?: Tone;
};

const GlobalStyles = () => (
  <style>
    {`
      @import url('https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible+Next:wght@400;500;600;700;800;900&display=swap');

      body,
      #app,
      .spectacle-deck,
      .spectacle-slide {
        font-family: "Atkinson Hyperlegible Next", system-ui, sans-serif;
      }
    `}
  </style>
);

const Accent = ({ children }: { children: React.ReactNode }) => (
  <Box as="span" color="tertiary">
    {children}
  </Box>
);

const Keyword = ({ children, color = 'blue' }: { children: React.ReactNode; color?: 'blue' | 'green' | 'red' | 'ink' }) => (
  <span
    style={{
      color: theme.colors[color],
      fontWeight: 950
    }}
  >
    {children}
  </span>
);

const Kicker = ({ children, light = false }: { children: React.ReactNode; light?: boolean }) => (
  <Text
    color={light ? 'yellow' : 'tertiary'}
    fontSize="18px"
    fontWeight={800}
    margin="0 0 14px"
    style={{ letterSpacing: '0.08em', textTransform: 'uppercase' }}
  >
    {children}
  </Text>
);

const Pill = ({ children, color = 'blue' }: { children: React.ReactNode; color?: string }) => (
  <Box
    backgroundColor={color}
    color={color === 'yellow' ? 'secondary' : 'primary'}
    padding="8px 14px"
    style={{ borderRadius: 999, fontSize: 18, fontWeight: 800 }}
  >
    {children}
  </Box>
);

const BulletList = ({
  items,
  light = false,
  fontSize = '26px',
  itemMargin = '0 0 13px'
}: {
  items: React.ReactNode[];
  light?: boolean;
  fontSize?: string;
  itemMargin?: string;
}) => (
  <UnorderedList color={light ? 'primary' : 'ink'} fontSize={fontSize} fontWeight={500} lineHeight={1.28} margin="0">
    {items.map((item, index) => (
      <ListItem key={index} margin={itemMargin}>
        {item}
      </ListItem>
    ))}
  </UnorderedList>
);

const Card = ({
  title,
  children,
  tone = 'blue',
  compact = false
}: {
  title: string;
  children: React.ReactNode;
  tone?: Tone;
  compact?: boolean;
}) => (
  <Box
    backgroundColor="rgba(255,255,255,0.06)"
    border={`3px solid ${theme.colors[tone]}`}
    padding={compact ? '14px 16px' : '22px'}
    minHeight={compact ? '108px' : '160px'}
    style={{ borderRadius: 8 }}
  >
    <Text color={tone} fontSize={compact ? '21px' : '24px'} fontWeight={800} margin={compact ? '0 0 4px' : '0 0 10px'}>
      {title}
    </Text>
    {typeof children === 'string' ? (
      <Text color="ink" fontSize={compact ? '20px' : '23px'} fontWeight={500} lineHeight={1.24} margin="0">
        {children}
      </Text>
    ) : (
      <Text color="ink" fontSize={compact ? '20px' : '23px'} fontWeight={500} lineHeight={1.24} margin="0">
        {children}
      </Text>
    )}
  </Box>
);

const SlideProgressBar = () => {
  const { activeView, slideCount } = React.useContext(DeckContext);
  const currentSlide = activeView.slideIndex + 1;
  const progress = slideCount > 0 ? (currentSlide / slideCount) * 100 : 0;

  return (
    <FlexBox alignItems="center" style={{ gap: 10 }}>
      <Text color="muted" fontSize="14px" fontWeight={800} margin="0">
        {String(currentSlide).padStart(2, '0')} / {String(slideCount).padStart(2, '0')}
      </Text>
      <Box backgroundColor="rgba(95,108,114,0.25)" height="7px" width="118px" style={{ borderRadius: 999, overflow: 'hidden' }}>
        <Box
          backgroundColor="tertiary"
          height="100%"
          width={`${progress}%`}
          style={{ borderRadius: 999, transition: 'width 220ms ease' }}
        />
      </Box>
    </FlexBox>
  );
};

const SlideTemplate = () => (
  <FlexBox justifyContent="space-between" position="absolute" bottom={0} width={1}>
    <Box padding="0 1em">
      <FullScreen color={theme.colors.muted} />
    </Box>
  </FlexBox>
);

const TitleSlide = () => (
  <Slide backgroundColor="navy">
    <FlexBox height="100%" flexDirection="column" alignItems="flex-start" justifyContent="center" padding="0 56px">
      <Kicker light>Sistemas Distribuídos</Kicker>
      <Heading color="primary" fontSize="64px" lineHeight={1.05} margin="0 0 28px" width="92%">
        Blockchain como <Accent>sistema distribuído</Accent>
      </Heading>
      <Text color="primary" fontSize="28px" lineHeight={1.35} width="82%" margin="0">
        Uma introdução à tecnologia blockchain para além das criptomoedas: consenso, replicação, criptografia,
        descentralização e execução programável.
      </Text>
      <FlexBox marginTop="54px" width="100%" justifyContent="space-between">
        <Pill color="yellow">Matheus Silva Freitas</Pill>
      </FlexBox>
    </FlexBox>
  </Slide>
);

const ChapterSlide = ({ chapter, title, subtitle }: { chapter: string; title: string; subtitle?: string }) => (
  <Slide backgroundColor="navy">
    <FlexBox height="100%" flexDirection="column" alignItems="flex-start" justifyContent="center" padding="0 64px">
      <Kicker light>{chapter}</Kicker>
      <Heading color="primary" fontSize="66px" lineHeight={1.05} margin="0 0 24px">
        {title}
      </Heading>
      {subtitle && (
        <Text color="primary" fontSize="30px" lineHeight={1.3} width="78%" margin="0">
          {subtitle}
        </Text>
      )}
    </FlexBox>
  </Slide>
);

const TopicSlide = ({ chapter, title, subtitle, bullets, note, image, customContent, tone = 'blue' }: Topic) => (
  <Slide backgroundColor="paper" style={{ background: theme.colors.paper, color: theme.colors.ink }}>
    <FlexBox height="100%" flexDirection="column" alignItems="stretch" justifyContent="flex-start" padding="42px 54px">
      <Kicker>{chapter}</Kicker>
      <Heading color="ink" fontSize="46px" lineHeight={1.08} margin={subtitle ? '0 0 8px' : '0 0 28px'}>
        {title}
      </Heading>
      {subtitle && (
        <Text color="muted" fontSize="28px" fontWeight={700} lineHeight={1.25} margin="0 0 28px">
          {subtitle}
        </Text>
      )}
      {customContent ?? (
        <Grid gridTemplateColumns={note || image ? '1.12fr 0.88fr' : '1fr'} gridColumnGap="30px" alignItems="center" style={{ flex: 1 }}>
          <BulletList items={bullets} fontSize={bullets.length > 5 ? '23px' : '26px'} itemMargin={bullets.length > 5 ? '0 0 9px' : '0 0 13px'} />
          {image ? (
            <Box backgroundColor="rgba(255,255,255,0.06)" padding="10px" border="2px solid #1E3348" style={{ borderRadius: 8 }}>
              <Image src={image.src} alt={image.alt} width="100%" style={{ maxHeight: '360px', objectFit: 'contain' }} />
            </Box>
          ) : note ? (
            <Card title="Ponto-chave" tone={tone}>
              {note}
            </Card>
          ) : null}
        </Grid>
      )}
    </FlexBox>
  </Slide>
);

const ImageTopicSlide = () => (
  <Slide backgroundColor="paper" style={{ background: theme.colors.paper, color: theme.colors.ink }}>
    <FlexBox height="100%" flexDirection="column" alignItems="stretch" justifyContent="flex-start" padding="42px 54px">
      <Kicker>A Estrutura</Kicker>
      <Heading color="ink" fontSize="46px" lineHeight={1.08} margin="0 0 26px">
        O que é blockchain?
      </Heading>
      <Grid gridTemplateColumns="1.3fr 0.7fr" gridColumnGap="24px" alignItems="center" style={{ flex: 1 }}>
        <Box>
          <Box backgroundColor="white" padding="6px" border="2px solid #D7CEC1" style={{ borderRadius: 8 }}>
            <Image src={transactionImage} alt="Exemplo de transação em blockchain" width="100%" />
          </Box>
          <Box marginTop="12px" backgroundColor="navy" padding="14px 16px" style={{ borderRadius: 8 }}>
            <Text color="yellow" fontSize="20px" fontWeight={900} margin="0 0 4px">
              Consequência
            </Text>
            <Text color="primary" fontSize="20px" lineHeight={1.24} margin="0">
              Alterar um bloco antigo muda seu hash, invalida referências posteriores e torna a adulteração detectável.
            </Text>
          </Box>
        </Box>
        <Box>
          <Card title="Ledger" tone="blue" compact>
            Livro-razão compartilhado, replicado, verificável e resistente a alterações.
          </Card>
          <Box height="10px" />
          <Card title="Append-only" tone="green" compact>
            Novos registros são adicionados; o histórico anterior não é reescrito.
          </Card>
        </Box>
      </Grid>
    </FlexBox>
  </Slide>
);

const chainBlocks = [
  { index: 1, data: 12, hash: 'A9F2C' },
  { index: 2, data: 27, hash: 'B41D8' },
  { index: 3, data: 43, changedData: 99, hash: 'C7E10', changedHash: 'F91BC' },
  { index: 4, data: 58, hash: 'D03A1' },
  { index: 5, data: 76, hash: 'E8B44' }
];

const AnimatedBlockchainSlide = () => {
  const [step, setStep] = React.useState(0);
  const invalidColor = '#8A1020';
  const pendingColor = '#111111';
  const validColor = theme.colors.navy;
  const tampered = step >= 6;
  const advance = (event: React.MouseEvent) => {
    event.stopPropagation();
    setStep((current) => (current + 1) % 7);
  };
  const getOriginalPrevHash = (index: number) => (index === 1 ? 'GENES' : chainBlocks[index - 2].hash);
  const getExpectedPrevHash = (index: number) => {
    if (index === 1) return 'GENES';
    const previous = chainBlocks[index - 2];
    return tampered && previous.index === 3 && previous.changedHash ? previous.changedHash : previous.hash;
  };

  return (
    <Slide backgroundColor="paper" style={{ background: theme.colors.paper, color: theme.colors.ink }}>
      <FlexBox height="100%" flexDirection="column" alignItems="stretch" justifyContent="flex-start" padding="42px 54px">
        <Kicker>A Estrutura</Kicker>
        <Heading color="ink" fontSize="46px" lineHeight={1.08} margin="0 0 10px">
          A cadeia sendo construída
        </Heading>
        <Text color="muted" fontSize="25px" fontWeight={700} lineHeight={1.24} margin="0 0 28px">
          Cada bloco carrega um dado, um hash próprio e a referência ao hash anterior. Se um dado antigo muda, o hash muda e os próximos blocos deixam de apontar para a cadeia correta.
        </Text>

        <FlexBox flex={1} alignItems="center" justifyContent="center" onClick={advance} style={{ cursor: 'pointer' }}>
          <Box width="100%">
            <FlexBox alignItems="center" justifyContent="center" style={{ gap: 8 }}>
              {chainBlocks.map((block, index) => {
                const visible = step >= block.index;
                const pending = !visible && step + 1 === block.index && step < 5;
                const active = visible || pending;
                const changed = tampered && block.index === 3;
                const invalid = tampered && block.index >= 4;
                const currentHash = changed && block.changedHash ? block.changedHash : block.hash;
                const currentData = changed && block.changedData ? block.changedData : block.data;
                const storedPrevHash = getOriginalPrevHash(block.index);
                const expectedPrevHash = getExpectedPrevHash(block.index);
                const prevHashMismatch = visible && invalid && storedPrevHash !== expectedPrevHash;
                const backgroundColor = pending ? pendingColor : invalid ? invalidColor : validColor;
                const borderColor = prevHashMismatch ? '#FFD6D6' : changed ? theme.colors.yellow : 'rgba(215,206,193,0.62)';

                return (
                  <React.Fragment key={block.index}>
                    {index > 0 && (
                      <motion.div
                        animate={{
                          opacity: step >= block.index - 1 ? (invalid ? 0.45 : 0.9) : 0,
                          scaleX: step >= block.index - 1 ? 1 : 0,
                          backgroundColor: invalid ? invalidColor : theme.colors.muted
                        }}
                        transition={{
                          duration: 0.24,
                          ease: 'easeOut'
                        }}
                        style={{
                          width: 28,
                          height: 4,
                          borderRadius: 999,
                          transformOrigin: 'left'
                        }}
                      />
                    )}

                    <motion.div
                      animate={{
                        opacity: active ? (pending ? 0.45 : 1) : 0,
                        y: active ? 0 : -12,
                        scale: active ? 1 : 0.96,
                        backgroundColor,
                        borderColor
                      }}
                      transition={{
                        duration: 0.28,
                        ease: 'easeOut'
                      }}
                      style={{
                        width: 136,
                        height: 152,
                        border: '2px solid',
                        borderRadius: 8,
                        boxShadow: '0 8px 18px rgba(16,32,43,0.14)',
                        display: 'grid',
                        gridTemplateRows: '27px 1fr 58px',
                        overflow: 'hidden',
                        color: theme.colors.primary
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0 8px',
                          borderBottom: '1px solid rgba(247,241,232,0.18)',
                          fontSize: 13,
                          fontWeight: 400,
                          lineHeight: 1,
                          whiteSpace: 'nowrap'
                        }}
                      >
                        <span>Bloco {block.index}</span>
                        <div
                          style={{
                            color: changed ? theme.colors.yellow : invalid ? '#FFD6D6' : 'rgba(247,241,232,0.56)',
                            fontSize: 10,
                            fontWeight: 400,
                            lineHeight: 1,
                            opacity: visible ? 1 : 0.65
                          }}
                        >
                          {changed ? 'alterado' : invalid ? 'inválido' : pending ? 'novo' : 'válido'}
                        </div>
                      </div>

                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '48px 1fr',
                          alignItems: 'center',
                          columnGap: 6,
                          padding: '8px',
                          minHeight: 0
                        }}
                      >
                        <div style={{ color: 'rgba(247,241,232,0.72)', fontSize: 11, fontWeight: 400, lineHeight: 1 }}>
                          dado
                        </div>
                        <div style={{ position: 'relative', height: 30, minWidth: 0 }}>
                          <motion.div
                            key={`${block.index}-data-${currentData}`}
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                            style={{ position: 'absolute', inset: 0, color: changed ? theme.colors.yellow : theme.colors.primary, fontSize: 26, fontWeight: 300, lineHeight: '30px' }}
                          >
                            {currentData}
                          </motion.div>
                        </div>
                      </div>

                      <div
                        style={{
                          display: 'grid',
                          gridTemplateRows: '1fr 1fr',
                          padding: '5px 8px',
                          borderTop: '1px solid rgba(247,241,232,0.18)',
                          background: 'rgba(0,0,0,0.12)',
                          minWidth: 0
                        }}
                      >
                        <div style={{ display: 'grid', gridTemplateColumns: '38px 1fr', alignItems: 'center', columnGap: 6 }}>
                          <div style={{ color: 'rgba(247,241,232,0.72)', fontSize: 10, fontWeight: 400, lineHeight: 1 }}>
                            hash
                          </div>
                          <motion.div
                            key={`${block.index}-hash-${currentHash}`}
                            initial={{ opacity: 0, y: -3 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                            style={{ color: invalid ? '#FFD6D6' : theme.colors.yellow, fontSize: 14, fontWeight: 400, letterSpacing: 0, fontFamily: 'monospace', lineHeight: 1 }}
                          >
                            {currentHash}
                          </motion.div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '38px 1fr', alignItems: 'center', columnGap: 6 }}>
                          <div style={{ color: prevHashMismatch ? '#FFD6D6' : 'rgba(247,241,232,0.72)', fontSize: 10, fontWeight: 400, lineHeight: 1 }}>
                            prev
                          </div>
                          <div style={{ position: 'relative', minWidth: 0 }}>
                            <motion.div
                              animate={{
                                color: prevHashMismatch ? '#FFD6D6' : 'rgba(247,241,232,0.82)',
                                textDecorationLine: prevHashMismatch ? 'line-through' : 'none'
                              }}
                              transition={{ duration: 0.2 }}
                              style={{ fontSize: 14, fontWeight: 400, letterSpacing: 0, fontFamily: 'monospace', lineHeight: 1 }}
                            >
                              {storedPrevHash}
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </React.Fragment>
                );
              })}
            </FlexBox>

            <FlexBox justifyContent="center" marginTop="28px">
              <motion.div
                animate={{ opacity: tampered ? 1 : 0, y: tampered ? 0 : 8 }}
                transition={{ duration: 0.22 }}
                style={{
                  background: 'rgba(255,80,80,0.18)',
                  border: `2px solid ${invalidColor}`,
                  borderRadius: 8,
                  padding: '10px 15px',
                  maxWidth: 760
                }}
              >
                <Text color="ink" fontSize="21px" fontWeight={500} lineHeight={1.2} margin="0">
                  O bloco 3 agora tem hash F91BC. Os blocos 4 e 5 ainda apontam para C7E10 como hash anterior, então a cadeia fica inconsistente.
                </Text>
              </motion.div>
            </FlexBox>
            <Text color="muted" fontSize="16px" fontWeight={600} margin="16px 0 0" textAlign="center">
              Clique na cadeia: inserir blocos válidos → alterar bloco 3 → reiniciar.
            </Text>
          </Box>
        </FlexBox>
      </FlexBox>
    </Slide>
  );
};

const powMiningBlocks = [
  { index: 1, data: 12, attempts: ['f3a1', '8b20', '91d4', '4c2e', '2ab7', '0f91', '00a4'] },
  { index: 2, data: 27, attempts: ['d710', '6e42', 'a5c9', '31f0', '974b', '4e88', '209d', '0f22', '7b16', '590a', '00c8'] },
  {
    index: 3,
    data: 43,
    changedData: 99,
    attempts: ['a901', '510f', 'c6b0', '73d2', '2e49', 'f118', '8a0c', '3bf4', '079a', 'b44e', '61c7', '1d30', '00e2'],
    changedHash: 'b83f'
  },
  { index: 4, data: 58, attempts: ['c604', '30b9', 'e7a2', '92fc', '410d', '04aa', 'a6d1', '5c70', '22b8', 'd903', '8f45', '1b6e', '70c9', '33fa', '0ab2', '003d'] },
  { index: 5, data: 76, attempts: ['e117', '44c0', 'c09e', '7134', '2df8', '0941', 'ef52', 'b8ac', '60d7', '4f13', 'ae89', '83b0', '28c5', '117e', 'db3a', '6a09', '390f', '0cc2', '00f0'] }
];

const ProofOfWorkMiningSlide = () => {
  const [minedCount, setMinedCount] = React.useState(0);
  const [nonce, setNonce] = React.useState(0);
  const [isMining, setIsMining] = React.useState(false);
  const [tampered, setTampered] = React.useState(false);
  const [justMinedIndex, setJustMinedIndex] = React.useState<number | null>(null);
  const target = '00ff';
  const invalidColor = '#8A1020';
  const getOriginalPowPrevHash = (index: number) => (index === 1 ? 'GENS' : powMiningBlocks[index - 2].attempts[powMiningBlocks[index - 2].attempts.length - 1]);
  const getExpectedPowPrevHash = (index: number) => {
    if (index === 1) return 'GENS';
    const previous = powMiningBlocks[index - 2];
    return tampered && previous.index === 3 && previous.changedHash ? previous.changedHash : previous.attempts[previous.attempts.length - 1];
  };

  React.useEffect(() => {
    if (!isMining || minedCount >= powMiningBlocks.length) return undefined;

    const currentBlock = powMiningBlocks[minedCount];
    const timer = window.setInterval(() => {
      setNonce((currentNonce) => {
        const nextNonce = currentNonce + 1;

        if (nextNonce >= currentBlock.attempts.length - 1) {
          window.clearInterval(timer);
          setIsMining(false);
          setMinedCount((current) => current + 1);
          setJustMinedIndex(currentBlock.index);

          window.setTimeout(() => {
            setJustMinedIndex((current) => (current === currentBlock.index ? null : current));
          }, 900);

          return currentBlock.attempts.length - 1;
        }

        return nextNonce;
      });
    }, 260);

    return () => window.clearInterval(timer);
  }, [isMining, minedCount]);

  const advance = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (isMining) return;

    if (tampered) {
      setMinedCount(0);
      setNonce(0);
      setTampered(false);
      setJustMinedIndex(null);
      return;
    }

    if (minedCount >= powMiningBlocks.length) {
      setTampered(true);
      setJustMinedIndex(null);
      return;
    }

    setNonce(0);
    setJustMinedIndex(null);
    setIsMining(true);
  };

  return (
    <Slide backgroundColor="paper" style={{ background: theme.colors.paper, color: theme.colors.ink }}>
      <FlexBox height="100%" flexDirection="column" alignItems="stretch" justifyContent="flex-start" padding="42px 54px">
        <FlexBox alignItems="flex-start" justifyContent="space-between" margin="0 0 0">
          <Box>
            <Kicker>Consenso</Kicker>
            <Heading color="ink" fontSize="46px" lineHeight={1.08} margin="0 0 4px">
              Minerando a cadeia
            </Heading>
            <Text color="muted" fontSize="21px" fontWeight={700} lineHeight={1.12} margin="0 0 8px">
              Um clique inicia a busca do nonce; ao encontrar o hash válido, o bloco é minerado.
            </Text>
          </Box>
          <a
            href="https://andersbrownworth.com/blockchain/blockchain"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: theme.colors.tertiary,
              color: '#fff',
              textDecoration: 'none',
              padding: '8px 18px',
              borderRadius: 8,
              fontSize: 17,
              fontWeight: 700,
              whiteSpace: 'nowrap',
              marginTop: 4,
              flexShrink: 0
            }}
          >
            Testar online ↗
          </a>
        </FlexBox>

        <FlexBox flex={1} alignItems="center" justifyContent="center" onClick={advance} style={{ cursor: 'pointer' }}>
          <Box width="100%">
            <FlexBox justifyContent="center" margin="0 0 10px">
              <Box backgroundColor="navy" padding="7px 16px" style={{ borderRadius: 8 }}>
                <Text color="primary" fontSize="18px" fontWeight={700} margin="0">
                  alvo: <span style={{ color: theme.colors.yellow, fontFamily: 'monospace' }}>&lt; x{target}</span>
                </Text>
              </Box>
            </FlexBox>

            <FlexBox alignItems="center" justifyContent="center" style={{ gap: 8 }}>
              {powMiningBlocks.map((block, index) => {
                const isActive = minedCount === index && isMining && !tampered;
                const pending = minedCount === index && !isMining && !tampered;
                const mined = minedCount > index || tampered;
                const visible = mined || isActive;
                const displayNonce = isActive ? nonce : mined ? block.attempts.length - 1 : 0;
                const changed = tampered && block.index === 3;
                const invalid = tampered && block.index >= 3;
                const hash = changed && block.changedHash ? block.changedHash : block.attempts[displayNonce];
                const storedPrevHash = getOriginalPowPrevHash(block.index);
                const expectedPrevHash = getExpectedPowPrevHash(block.index);
                const prevHashMismatch = visible && block.index >= 4 && storedPrevHash !== expectedPrevHash;
                const validHash = mined && !invalid && !changed;
                const data = changed && block.changedData ? block.changedData : block.data;
                const backgroundColor = !visible ? '#111111' : invalid ? invalidColor : validHash ? theme.colors.navy : '#111111';
                const borderColor = invalid ? (changed ? theme.colors.yellow : '#FFD6D6') : justMinedIndex === block.index ? theme.colors.yellow : validHash ? 'rgba(215,206,193,0.75)' : theme.colors.muted;

                return (
                  <React.Fragment key={block.index}>
                    {index > 0 && (
                      <motion.div
                        animate={{
                          opacity: minedCount >= index ? (invalid ? 0.45 : 0.9) : 0,
                          scaleX: minedCount >= index ? 1 : 0,
                          backgroundColor: invalid ? invalidColor : theme.colors.muted
                        }}
                        transition={{ duration: 0.24, ease: 'easeOut' }}
                        style={{ width: 26, height: 4, borderRadius: 999, transformOrigin: 'left' }}
                      />
                    )}

                    <motion.div
                      animate={{
                        opacity: visible ? 1 : 0.18,
                        y: visible ? 0 : -10,
                        scale: visible ? 1 : 0.96,
                        backgroundColor,
                        borderColor,
                        boxShadow:
                          justMinedIndex === block.index
                            ? [
                                '0 8px 18px rgba(16,32,43,0.14)',
                                '0 0 0 5px rgba(243,182,31,0.30), 0 0 30px rgba(243,182,31,0.92)',
                                '0 8px 18px rgba(16,32,43,0.14)'
                              ]
                            : invalid
                              ? '0 8px 18px rgba(138,16,32,0.20)'
                              : '0 8px 18px rgba(16,32,43,0.14)'
                      }}
                      transition={{ duration: 0.28, ease: 'easeOut', boxShadow: { duration: 0.9, ease: 'easeOut' } }}
                      style={{
                        width: 136,
                        height: 160,
                        border: '2px solid',
                        borderRadius: 8,
                        display: 'grid',
                        gridTemplateRows: '27px 1fr 76px',
                        overflow: 'hidden',
                        color: theme.colors.primary
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0 8px',
                          borderBottom: '1px solid rgba(247,241,232,0.18)',
                          fontSize: 13,
                          fontWeight: 400,
                          lineHeight: 1,
                          whiteSpace: 'nowrap'
                        }}
                      >
                        <span>Bloco {block.index}</span>
                        <span
                          style={{
                            color: invalid ? (changed ? theme.colors.yellow : '#FFD6D6') : validHash ? theme.colors.yellow : 'rgba(247,241,232,0.62)',
                            fontSize: 10
                          }}
                        >
                          {changed ? 'sem prova' : invalid ? 'inválido' : validHash ? 'válido' : isActive ? 'minerando' : pending ? 'pronto' : 'aguarda'}
                        </span>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '48px 1fr', alignItems: 'center', columnGap: 6, padding: '8px' }}>
                        <div style={{ color: 'rgba(247,241,232,0.72)', fontSize: 11, lineHeight: 1 }}>dado</div>
                        <motion.div
                          key={`${block.index}-pow-data-${data}`}
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                          style={{ color: changed ? theme.colors.yellow : theme.colors.primary, fontSize: 25, fontWeight: 300, lineHeight: 1 }}
                        >
                          {data}
                        </motion.div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateRows: 'repeat(3, 1fr)', padding: '5px 8px', borderTop: '1px solid rgba(247,241,232,0.18)', background: 'rgba(0,0,0,0.12)' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '46px 1fr', alignItems: 'center', columnGap: 6 }}>
                          <span style={{ color: 'rgba(247,241,232,0.72)', fontSize: 9 }}>nonce</span>
                          <motion.span
                            key={`${block.index}-nonce-${displayNonce}`}
                            initial={{ opacity: 0, y: -3 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.18 }}
                            style={{ color: theme.colors.primary, fontSize: 13, fontFamily: 'monospace' }}
                          >
                            {displayNonce}
                          </motion.span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '46px 1fr', alignItems: 'center', columnGap: 6 }}>
                          <span style={{ color: prevHashMismatch ? '#FFD6D6' : 'rgba(247,241,232,0.72)', fontSize: 9 }}>prev</span>
                          <motion.span
                            animate={{
                              color: prevHashMismatch ? '#FFD6D6' : 'rgba(247,241,232,0.78)',
                              textDecorationLine: prevHashMismatch ? 'line-through' : 'none'
                            }}
                            transition={{ duration: 0.18 }}
                            style={{ fontSize: 13, fontFamily: 'monospace' }}
                          >
                            x{storedPrevHash}
                          </motion.span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '46px 1fr', alignItems: 'center', columnGap: 6 }}>
                          <span style={{ color: 'rgba(247,241,232,0.72)', fontSize: 9 }}>hash</span>
                          <motion.span
                            key={`${block.index}-pow-hash-${hash}`}
                            initial={{ opacity: 0, y: -3 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.18 }}
                            style={{ color: changed ? theme.colors.yellow : invalid ? '#FFD6D6' : hash < target ? theme.colors.yellow : 'rgba(247,241,232,0.78)', fontSize: 13, fontFamily: 'monospace' }}
                          >
                            x{hash}
                          </motion.span>
                        </div>
                      </div>
                    </motion.div>
                  </React.Fragment>
                );
              })}
            </FlexBox>

            <FlexBox justifyContent="center" marginTop="8px">
              <motion.div
                animate={{ opacity: tampered ? 1 : 0, y: tampered ? 0 : 8 }}
                transition={{ duration: 0.22 }}
                style={{ background: 'rgba(255,80,80,0.18)', border: `2px solid ${invalidColor}`, borderRadius: 8, padding: '7px 12px', maxWidth: 820 }}
              >
                <Text color="ink" fontSize="17px" fontWeight={500} lineHeight={1.12} margin="0">
                  Ao alterar o bloco 3, seu hash vira xb83f, que não fica abaixo de x00ff. O bloco 3 perde a prova e os blocos 4 e 5 ficam inválidos.
                </Text>
              </motion.div>
            </FlexBox>
            <Text color="muted" fontSize="14px" fontWeight={600} margin="6px 0 0" textAlign="center">
              Clique para buscar automaticamente o nonce do bloco atual. Depois dos 5 blocos, clique para alterar o bloco 3.
            </Text>
          </Box>
        </FlexBox>
      </FlexBox>
    </Slide>
  );
};

const posValidators = [
  { id: 'A', stake: 50, tone: 'blue' as Tone, color: theme.colors.blue, reward: '+2', penalty: '-20' },
  { id: 'B', stake: 35, tone: 'green' as Tone, color: theme.colors.green, reward: '+2', penalty: '0' },
  { id: 'C', stake: 15, tone: 'yellow' as Tone, color: theme.colors.yellow, reward: '+1', penalty: '0' }
];

const posBlocks = [
  { index: 1, proposer: 'A', value: 14 },
  { index: 2, proposer: 'B', value: 22 },
  { index: 3, proposer: 'A', value: 31 },
  { index: 4, proposer: 'B', value: 40, changedValue: 99 },
  { index: 5, proposer: 'A', value: 52 },
  { index: 6, proposer: 'B', value: 63 },
  { index: 7, proposer: 'A', value: 70 },
  { index: 8, proposer: 'C', value: 81 },
  { index: 9, proposer: 'A', value: 94 },
  { index: 10, proposer: 'C', value: 108 }
];

const ProofOfStakeValidationSlide = () => {
  const [step, setStep] = React.useState(0);
  const attackVisible = step >= 9;
  const resolved = step >= 10;
  const activeProposer = !resolved && step > 0 ? posBlocks[Math.min(step, 9) - 1].proposer : null;
  const advance = (event: React.MouseEvent) => {
    event.stopPropagation();
    setStep((current) => (current >= 10 ? 0 : current + 1));
  };

  return (
    <Slide backgroundColor="paper" style={{ background: theme.colors.paper, color: theme.colors.ink }}>
      <FlexBox height="100%" flexDirection="column" alignItems="stretch" justifyContent="flex-start" padding="38px 48px">
        <Kicker>Consenso</Kicker>
        <Heading color="ink" fontSize="44px" lineHeight={1.06} margin="0 0 4px">
          Validadores em Proof of Stake
        </Heading>

        <FlexBox flex={1} flexDirection="column" justifyContent="center" onClick={advance} style={{ cursor: 'pointer' }}>
          <Grid gridTemplateColumns="repeat(3, 1fr)" gridColumnGap="14px" margin="0 0 10px">
            {posValidators.map((validator) => {
              const punished = resolved && validator.id === 'A';
              const rewarded = resolved && validator.id !== 'A';
              const active = activeProposer === validator.id;
              return (
                <motion.div
                  key={validator.id}
                  animate={{
                    borderColor: punished ? theme.colors.red : rewarded ? theme.colors.green : active ? theme.colors.yellow : validator.color,
                    backgroundColor: punished ? 'rgba(255,80,80,0.18)' : rewarded ? 'rgba(45,147,108,0.22)' : active ? 'rgba(243,182,31,0.16)' : 'rgba(255,255,255,0.06)',
                    y: punished ? [0, -3, 0] : active ? -5 : 0,
                    scale: active ? 1.03 : 1,
                    boxShadow: active
                      ? `0 0 0 4px rgba(243,182,31,0.24), 0 12px 24px rgba(16,32,43,0.18)`
                      : punished
                        ? '0 8px 18px rgba(138,16,32,0.16)'
                        : '0 8px 18px rgba(16,32,43,0.08)'
                  }}
                  transition={{ duration: 0.32, ease: 'easeOut' }}
                  style={{
                    border: '3px solid',
                    borderRadius: 8,
                    padding: '7px 10px',
                    display: 'grid',
                    gridTemplateColumns: '42px 1fr auto',
                    alignItems: 'center',
                    columnGap: 10,
                    minHeight: 70
                  }}
                >
                  <FlexBox alignItems="center" justifyContent="center" backgroundColor={validator.tone} height="42px" width="42px" style={{ borderRadius: 8 }}>
                    <FaServer size={22} color={validator.tone === 'yellow' ? theme.colors.ink : theme.colors.primary} />
                  </FlexBox>
                  <Box>
                    <Text color="ink" fontSize="20px" fontWeight={900} lineHeight={1} margin="0 0 5px">
                      Validador {validator.id}
                    </Text>
                    <Text color="muted" fontSize="16px" fontWeight={700} lineHeight={1} margin="0">
                      stake {validator.stake}
                    </Text>
                  </Box>
                  <Text color={punished ? 'red' : rewarded ? 'green' : 'muted'} fontSize="18px" fontWeight={900} margin="0">
                    {punished ? validator.penalty : rewarded ? validator.reward : `${validator.stake}%`}
                  </Text>
                </motion.div>
              );
            })}
          </Grid>

          <Grid gridTemplateColumns="repeat(5, 1fr)" gridColumnGap="8px" gridRowGap="8px">
            {posBlocks.map((block) => {
              const visible = step >= block.index || (attackVisible && block.index <= 9);
              const rewritten = attackVisible && block.index >= 4 && block.index <= 9;
              const attackedSource = attackVisible && block.index === 4;
              const acceptedAfterResolution = resolved && (block.index < 4 || block.index === 10);
              const proposer = posValidators.find((validator) => validator.id === block.proposer)!;
              const status = rewritten ? (block.index === 9 ? 'tentativa' : 'reescrito') : acceptedAfterResolution || visible ? 'aceito' : 'aguarda';
              const value = attackedSource && block.changedValue ? block.changedValue : block.value;

              return (
                <motion.div
                  key={block.index}
                  animate={{
                    opacity: visible ? 1 : 0.2,
                    scale: visible ? 1 : 0.96,
                    backgroundColor: rewritten ? '#8A1020' : visible ? theme.colors.navy : '#111111',
                    borderColor: attackedSource ? theme.colors.yellow : rewritten ? '#FFD6D6' : proposer.color
                  }}
                  transition={{ duration: 0.24, ease: 'easeOut' }}
                  style={{
                    height: 88,
                    border: '2px solid',
                    borderRadius: 8,
                    color: theme.colors.primary,
                    padding: '5px 7px',
                    display: 'grid',
                    gridTemplateRows: '18px 1fr 18px',
                    boxShadow: rewritten ? '0 8px 18px rgba(138,16,32,0.22)' : '0 8px 18px rgba(16,32,43,0.12)'
                  }}
                >
                  <FlexBox justifyContent="space-between" alignItems="center">
                    <Text color="primary" fontSize="12px" fontWeight={500} margin="0">
                      Bloco {block.index}
                    </Text>
                    <Text color={rewritten ? 'yellow' : proposer.tone} fontSize="11px" fontWeight={900} margin="0">
                      V{block.proposer}
                    </Text>
                  </FlexBox>
                  <Grid gridTemplateColumns="42px 1fr" alignItems="center" columnGap="5px">
                    <Text color="rgba(247,241,232,0.72)" fontSize="10px" margin="0">
                      dado
                    </Text>
                    <Text color={attackedSource ? 'yellow' : 'primary'} fontSize="23px" fontWeight={300} margin="0">
                      {value}
                    </Text>
                    <Text color="rgba(247,241,232,0.72)" fontSize="10px" margin="0">
                      slot
                    </Text>
                    <Text color="rgba(247,241,232,0.86)" fontSize="13px" margin="0" style={{ fontFamily: 'monospace' }}>
                      {block.index}
                    </Text>
                  </Grid>
                  <Text color={rewritten ? 'yellow' : 'rgba(247,241,232,0.72)'} fontSize="10px" fontWeight={800} margin="0">
                    {status}
                  </Text>
                </motion.div>
              );
            })}
          </Grid>

          <FlexBox justifyContent="center" marginTop="10px">
            <motion.div
              animate={{ opacity: attackVisible ? 1 : 0, y: attackVisible ? 0 : 6 }}
              transition={{ duration: 0.22 }}
              style={{
                background: resolved ? 'rgba(45,147,108,0.22)' : 'rgba(255,80,80,0.18)',
                border: `2px solid ${resolved ? theme.colors.green : theme.colors.red}`,
                borderRadius: 8,
                padding: '7px 12px',
                maxWidth: 880
              }}
            >
              <Text color="ink" fontSize="17px" fontWeight={500} lineHeight={1.12} margin="0">
                {resolved
                  ? 'Os validadores B e C rejeitam a cadeia reescrita, o validador A sofre slashing e os validadores honestos recebem recompensa.'
                  : 'No bloco 9, o validador A tenta alterar o bloco 4 e reescrever a sequência 4-9.'}
              </Text>
            </motion.div>
          </FlexBox>
          <Text color="muted" fontSize="14px" fontWeight={600} margin="6px 0 0" textAlign="center">
            Clique para avançar os slots. A distribuição 10/7/3 aproxima a chance proporcional ao stake: 50, 35 e 15.
          </Text>
        </FlexBox>
      </FlexBox>
    </Slide>
  );
};

const BenefitCard = ({
  title,
  text,
  icon: Icon,
  tone = 'green'
}: {
  title: string;
  text: string;
  icon: React.ComponentType<{ size?: number; color?: string; style?: React.CSSProperties }>;
  tone?: Tone;
}) => (
  <Box
    backgroundColor="rgba(255,255,255,0.06)"
    border={`3px solid ${theme.colors[tone]}`}
    minHeight="145px"
    padding="12px 18px"
    style={{ borderRadius: 8, display: 'grid', gridTemplateColumns: '1fr 68px', columnGap: 14, alignItems: 'center' }}
  >
    <Box>
      <Text color={tone} fontSize="22px" fontWeight={900} lineHeight={1.12} margin="0 0 8px">
        {title}
      </Text>
      <Text color="ink" fontSize="19px" fontWeight={500} lineHeight={1.22} margin="0">
        {text}
      </Text>
    </Box>
    <FlexBox alignItems="center" justifyContent="center" height="100%">
      <Icon size={46} color={theme.colors[tone]} style={{ display: 'block' }} />
    </FlexBox>
  </Box>
);

const DecisionQuestionCard = ({
  step,
  question,
  answer,
  tone = 'blue'
}: {
  step: string;
  question: string;
  answer: React.ReactNode;
  tone?: Tone;
}) => (
  <Box
    backgroundColor="rgba(255,255,255,0.06)"
    border={`3px solid ${theme.colors[tone]}`}
    padding="8px 7px"
    minHeight="112px"
    style={{
      borderRadius: 8,
      display: 'grid',
      gridTemplateColumns: '32px 1fr',
      columnGap: 7,
      alignItems: 'start'
    }}
  >
    <FlexBox
      alignItems="center"
      justifyContent="center"
      backgroundColor={tone}
      color={tone === 'yellow' ? 'secondary' : 'primary'}
      height="30px"
      width="30px"
      style={{ borderRadius: 8, fontSize: 16, fontWeight: 950 }}
    >
      {step}
    </FlexBox>
    <Box>
      <Text color={tone} fontSize="18px" fontWeight={950} lineHeight={1.05} margin="0 0 5px">
        {question}
      </Text>
      <Text color="ink" fontSize="16px" fontWeight={500} lineHeight={1.14} margin="0">
        {answer}
      </Text>
    </Box>
  </Box>
);

const BenefitsSlide = () => (
  <Slide backgroundColor="paper" style={{ background: theme.colors.paper, color: theme.colors.ink }}>
    <FlexBox height="100%" flexDirection="column" alignItems="stretch" justifyContent="flex-start" padding="42px 54px">
      <Kicker>Rede</Kicker>
      <Heading color="ink" fontSize="46px" lineHeight={1.08} margin="0 0 28px">
        Benefícios
      </Heading>
      <Grid gridTemplateColumns="repeat(3, 1fr)" gridColumnGap="18px" gridRowGap="18px">
        <BenefitCard title="Descentralização" text="Reduz dependência de intermediários e autoridades únicas." icon={FaNetworkWired} tone="green" />
        <BenefitCard title="Transparência" text="Facilita auditabilidade e verificação dos registros." icon={FaEye} tone="blue" />
        <BenefitCard title="Imutabilidade" text="Torna alterações retroativas detectáveis e custosas." icon={FaCubes} tone="red" />
        <BenefitCard title="Disponibilidade" text="Replicação mantém a rede operante mesmo sob falhas." icon={FaServer} tone="green" />
        <BenefitCard title="Segurança" text="Criptografia protege integridade, identidade e autorização." icon={FaShieldAlt} tone="blue" />
        <BenefitCard title="Programabilidade" text="Contratos inteligentes e ativos digitais escassos em uma mesma infraestrutura." icon={FaFileContract} tone="yellow" />
      </Grid>
    </FlexBox>
  </Slide>
);

const LimitationsSlide = () => (
  <Slide backgroundColor="paper" style={{ background: theme.colors.paper, color: theme.colors.ink }}>
    <FlexBox height="100%" flexDirection="column" alignItems="stretch" justifyContent="flex-start" padding="42px 54px">
      <Kicker>Sistemas Distribuídos?</Kicker>
      <Heading color="ink" fontSize="46px" lineHeight={1.08} margin="0 0 28px">
        Limitações
      </Heading>
      <Grid gridTemplateColumns="repeat(3, 1fr)" gridColumnGap="18px" gridRowGap="18px">
        <BenefitCard title="Escalabilidade" text="Throughput e latência ainda ficam atrás de sistemas tradicionais." icon={FaTachometerAlt} tone="red" />
        <BenefitCard title="Regulação" text="Regras legais e responsabilidade institucional ainda são difíceis." icon={FaGavel} tone="yellow" />
        <BenefitCard title="Privacidade" text="Blockchains públicas podem expor padrões de uso e transações." icon={FaUserSecret} tone="red" />
        <BenefitCard title="Maturidade" text="Segurança, governança e experiência de uso ainda evoluem." icon={FaTools} tone="blue" />
        <BenefitCard title="Interoperabilidade" text="Integração com legados e entre blockchains segue complexa." icon={FaExchangeAlt} tone="green" />
        <BenefitCard title="Adoção" text="Barreiras de confiança, custo e entendimento limitam uso real." icon={FaHandshake} tone="yellow" />
      </Grid>
    </FlexBox>
  </Slide>
);

const BlockchainTypesSlide = () => (
  <Slide backgroundColor="paper" style={{ background: theme.colors.paper, color: theme.colors.ink }}>
    <FlexBox height="100%" flexDirection="column" alignItems="stretch" justifyContent="flex-start" padding="42px 54px">
      <Kicker>Sistemas Distribuídos?</Kicker>
      <Heading color="ink" fontSize="46px" lineHeight={1.08} margin="0 0 28px">
        Tipos de blockchain
      </Heading>
      <FlexBox flex={1} alignItems="center" justifyContent="center">
        <Grid gridTemplateColumns="repeat(3, 1fr)" gridColumnGap="18px" gridRowGap="18px" width="100%">
          <Card title="Públicas" tone="green" compact>
            Abertas e permissionless, como Bitcoin e Ethereum.
          </Card>
          <Card title="Privadas / consortium" tone="blue" compact>
            Restritas a grupos ou organizações, como Hyperledger Fabric e Quorum.
          </Card>
          <Card title="Semi-privadas" tone="yellow" compact>
            Modelos híbridos, com abertura parcial e algum controle institucional.
          </Card>
          <Box
            backgroundColor="rgba(255,255,255,0.06)"
            border={`3px dashed ${theme.colors.red}`}
            padding="14px 18px"
            style={{ borderRadius: 8, gridColumn: '1 / -1' }}
          >
            <Text color="red" fontSize="22px" fontWeight={900} margin="0 0 6px">
              Permissioned ledgers
            </Text>
            <Text color="ink" fontSize="21px" fontWeight={500} lineHeight={1.24} margin="0">
              Participantes conhecidos e acesso controlado. É um eixo independente: uma rede pode ser privada,
              consortium ou híbrida e também ser permissionada.
            </Text>
          </Box>
        </Grid>
      </FlexBox>
    </FlexBox>
  </Slide>
);

const TokenTypesSlide = () => (
  <Slide backgroundColor="paper" style={{ background: theme.colors.paper, color: theme.colors.ink }}>
    <FlexBox height="100%" flexDirection="column" alignItems="stretch" justifyContent="flex-start" padding="42px 54px">
      <Kicker>Sistemas Distribuídos?</Kicker>
      <Heading color="ink" fontSize="46px" lineHeight={1.08} margin="0 0 28px">
        Tipos de blockchain
      </Heading>
      <FlexBox flex={1} alignItems="center" justifyContent="center">
        <Grid gridTemplateColumns="1fr 1fr" gridColumnGap="24px" width="100%">
          <Card title="Blockchains tokenizadas" tone="green">
            Possuem token nativo, como Bitcoin e Ethereum. O token participa do incentivo, da segurança ou do pagamento
            pelo uso da rede.
          </Card>
          <Box
            backgroundColor="rgba(255,255,255,0.06)"
            border={`3px solid ${theme.colors.muted}`}
            padding="22px"
            minHeight="160px"
            style={{ borderRadius: 8 }}
          >
            <Text color="muted" fontSize="24px" fontWeight={900} margin="0 0 10px">
              Tokenless blockchains
            </Text>
            <Text color="ink" fontSize="23px" fontWeight={500} lineHeight={1.24} margin="0">
              Não possuem criptoativo nativo. O foco fica em compartilhamento de dados, validação e governança entre
              participantes conhecidos.
            </Text>
          </Box>
        </Grid>
      </FlexBox>
    </FlexBox>
  </Slide>
);

const LayerTypesSlide = () => (
  <Slide backgroundColor="paper" style={{ background: theme.colors.paper, color: theme.colors.ink }}>
    <FlexBox height="100%" flexDirection="column" alignItems="stretch" justifyContent="flex-start" padding="42px 54px">
      <Kicker>Sistemas Distribuídos?</Kicker>
      <Heading color="ink" fontSize="46px" lineHeight={1.08} margin="0 0 28px">
        Tipos de blockchain
      </Heading>
      <FlexBox flex={1} alignItems="center" justifyContent="center">
        <Grid gridTemplateColumns="repeat(3, 1fr)" gridColumnGap="18px" width="100%">
          <Card title="Layer 1" tone="blue">
            Camada base responsável por consenso, segurança e verdade canônica da rede.
          </Card>
          <Card title="Layer 2" tone="green">
            Soluções sobre uma Layer 1 para escalar, reduzir custo ou adicionar privacidade.
          </Card>
          <Card title="Sidechains" tone="yellow">
            Cadeias paralelas conectadas à principal: funcionam com regras próprias, mas conseguem trocar ativos ou dados com a rede base.
          </Card>
        </Grid>
      </FlexBox>
    </FlexBox>
  </Slide>
);

const chainBlockStyle = (color: string, width = 74) => ({
  width,
  height: 48,
  borderRadius: 8,
  background: color,
  boxShadow: '0 14px 32px rgba(0,0,0,0.46)',
  border: '3px solid #FFFFFF',
  color: '#020817',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 900,
  fontSize: 19,
});

const flowCardStyle = (color: string) => ({
  minHeight: 118,
  borderRadius: 8,
  border: '3px solid #FFFFFF',
  background: color,
  color: '#020817',
  padding: '14px 16px',
  boxShadow: '0 14px 32px rgba(0,0,0,0.44)',
  display: 'flex',
  flexDirection: 'column' as const,
  justifyContent: 'center',
});

const Layer2VsLayer1AnimationSlide = () => (
  <Slide backgroundColor="paper" style={{ background: theme.colors.paper, color: theme.colors.ink }}>
    <FlexBox height="100%" flexDirection="column" alignItems="stretch" justifyContent="flex-start" padding="24px 54px">
      <Kicker>Sistemas Distribuídos?</Kicker>
      <Heading color="ink" fontSize="38px" lineHeight={1.04} margin="0 0 8px">
        Layer 2 x Layer 1
      </Heading>
      <Text color="white" fontSize="21px" fontWeight={800} lineHeight={1.16} margin="0 0 14px">
        Layer 2 não é uma blockchain separada: ela executa fora, mas publica provas e herda a segurança da Layer 1.
      </Text>

      <div
        style={{
          height: 360,
          flex: '0 0 360px',
          borderRadius: 8,
          border: '3px solid #FFFFFF',
          background: '#020817',
          padding: 22,
          display: 'grid',
          gridTemplateColumns: '1fr 130px 1.2fr',
          columnGap: 22,
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', rowGap: 18 }}>
          <div style={{ border: '3px solid #00E676', borderRadius: 8, padding: 16 }}>
            <div style={{ color: '#00E676', fontSize: 24, fontWeight: 900, marginBottom: 8 }}>Layer 2</div>
            <div style={{ color: '#FFFFFF', fontSize: 17, fontWeight: 800, lineHeight: 1.2 }}>
              Executa muitas transações fora da camada base.
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              {['tx', 'tx', 'tx'].map((label, index) => (
                <div key={`l2-stack-${index}`} style={chainBlockStyle('#00E676', 56)}>{label}</div>
              ))}
            </div>
          </div>
          <div style={{ border: '3px solid #38BDF8', borderRadius: 8, padding: 16 }}>
            <div style={{ color: '#38BDF8', fontSize: 24, fontWeight: 900, marginBottom: 8 }}>Layer 1</div>
            <div style={{ color: '#FFFFFF', fontSize: 17, fontWeight: 800, lineHeight: 1.2 }}>
              Mantém consenso, segurança e estado final.
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              {['B1', 'B2', 'B3'].map((label) => (
                <div key={label} style={chainBlockStyle('#38BDF8', 56)}>{label}</div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr 1fr', justifyItems: 'center', alignItems: 'center' }}>
          <div style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 900, textAlign: 'center' }}>resultado compactado</div>
          <div style={{ color: '#FFFFFF', fontSize: 48, fontWeight: 900 }}>↓</div>
          <div style={{ ...flowCardStyle('#FFFFFF'), minHeight: 82, textAlign: 'center' }}>
            <div style={{ fontSize: 18, fontWeight: 900 }}>Prova / lote</div>
            <div style={{ fontSize: 14, fontWeight: 800, lineHeight: 1.15 }}>publicado na L1</div>
          </div>
        </div>
        <div style={{ border: '3px solid #FFFFFF', borderRadius: 8, padding: 20, minHeight: 276, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ color: '#FFFFFF', fontSize: 26, fontWeight: 900, marginBottom: 14 }}>
            Diferença principal
          </div>
          <div style={{ color: '#00E676', fontSize: 22, fontWeight: 900, lineHeight: 1.2, marginBottom: 14 }}>
            A Layer 2 fica sobre a Layer 1.
          </div>
          <div style={{ display: 'grid', rowGap: 10 }}>
            <div style={{ color: '#FFFFFF', fontSize: 17, fontWeight: 800, lineHeight: 1.2 }}>
              1. Executa transações fora da camada base.
            </div>
            <div style={{ color: '#FFFFFF', fontSize: 17, fontWeight: 800, lineHeight: 1.2 }}>
              2. Publica lote ou prova na Layer 1.
            </div>
            <div style={{ color: '#FFFFFF', fontSize: 17, fontWeight: 800, lineHeight: 1.2 }}>
              3. Usa a Layer 1 como segurança e finalização.
            </div>
          </div>
        </div>
      </div>
    </FlexBox>
  </Slide>
);

const SidechainVsLayer1AnimationSlide = () => (
  <Slide backgroundColor="paper" style={{ background: theme.colors.paper, color: theme.colors.ink }}>
    <FlexBox height="100%" flexDirection="column" alignItems="stretch" justifyContent="flex-start" padding="24px 54px">
      <Kicker>Sistemas Distribuídos?</Kicker>
      <Heading color="ink" fontSize="38px" lineHeight={1.04} margin="0 0 8px">
        Sidechain x Layer 1
      </Heading>
      <Text color="white" fontSize="21px" fontWeight={800} lineHeight={1.16} margin="0 0 14px">
        Sidechain é outra blockchain: roda consenso próprio e usa ponte para trocar ativos ou dados com a Layer 1.
      </Text>

      <div
        style={{
          height: 360,
          flex: '0 0 360px',
          borderRadius: 8,
          border: '3px solid #FFFFFF',
          background: '#020817',
          padding: 22,
          display: 'grid',
          gridTemplateColumns: '1fr 140px 1fr',
          columnGap: 20,
          alignItems: 'center',
        }}
      >
        <div style={{ border: '3px solid #38BDF8', borderRadius: 8, padding: 18, minHeight: 276, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20 }}>
          <div>
            <div style={{ color: '#38BDF8', fontSize: 24, fontWeight: 900, marginBottom: 12 }}>Layer 1</div>
            <div style={{ color: '#FFFFFF', fontSize: 17, fontWeight: 800, lineHeight: 1.25 }}>
              Cadeia principal, com consenso e segurança próprios.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {['B1', 'B2', 'B3'].map((label) => (
              <div key={label} style={chainBlockStyle('#38BDF8', 64)}>{label}</div>
            ))}
          </div>
          <div style={{ ...flowCardStyle('#38BDF8'), minHeight: 72 }}>
            <div style={{ fontSize: 16, fontWeight: 900 }}>Segurança da L1</div>
          </div>
        </div>
        <div style={{ minHeight: 276, display: 'grid', gridTemplateRows: '1fr auto 1fr', alignItems: 'center', justifyItems: 'center' }}>
          <div style={{ color: '#FFFFFF', fontSize: 42, fontWeight: 900 }}>⇄</div>
          <div style={{ ...flowCardStyle('#FFFFFF'), minHeight: 118, textAlign: 'center' }}>
            <div style={{ fontSize: 18, fontWeight: 900, marginBottom: 6 }}>Ponte</div>
            <div style={{ fontSize: 14, fontWeight: 800, lineHeight: 1.15 }}>move ou espelha ativos entre cadeias</div>
          </div>
          <div style={{ color: '#FFFFFF', fontSize: 42, fontWeight: 900 }}>⇄</div>
        </div>
        <div style={{ border: '3px solid #FFD600', borderRadius: 8, padding: 18, minHeight: 276, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20 }}>
          <div>
            <div style={{ color: '#FFD600', fontSize: 24, fontWeight: 900, marginBottom: 12 }}>Sidechain</div>
            <div style={{ color: '#FFFFFF', fontSize: 17, fontWeight: 800, lineHeight: 1.25 }}>
              Cadeia paralela, com validadores e regras próprias.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {['S1', 'S2', 'S3'].map((label) => (
              <div key={label} style={chainBlockStyle('#FFD600', 64)}>{label}</div>
            ))}
          </div>
          <div style={flowCardStyle('#FFD600')}>
            <div style={{ fontSize: 16, fontWeight: 900 }}>Segurança própria</div>
          </div>
        </div>
      </div>
    </FlexBox>
  </Slide>
);

const NodeCommunicationSlide = () => (
  <Slide backgroundColor="paper" style={{ background: theme.colors.paper, color: theme.colors.ink }}>
    <FlexBox height="100%" flexDirection="column" alignItems="stretch" justifyContent="flex-start" padding="42px 54px">
      <Kicker>Rede Descentralizada</Kicker>
      <Heading color="ink" fontSize="46px" lineHeight={1.08} margin="0 0 10px">
        Comunicação entre nós
      </Heading>
      <Text color="muted" fontSize="28px" fontWeight={700} lineHeight={1.25} margin="0 0 24px">
        Nós trocam dados entre si para manter uma visão comum e confiável do estado.
      </Text>
      <Box
        backgroundColor="rgba(255,255,255,0.06)"
        padding="10px"
        border={`2px solid ${theme.colors.line}`}
        style={{ borderRadius: 8, display: 'flex', flex: 1, minHeight: 0 }}
      >
        <Image
          src={nodeImage}
          alt="Representação da comunicação entre nós em uma rede distribuída"
          width="100%"
          style={{ maxHeight: '420px', objectFit: 'contain' }}
        />
      </Box>
    </FlexBox>
  </Slide>
);

const DecentralizedImageSlide = () => (
  <Slide backgroundColor="paper" style={{ background: theme.colors.paper, color: theme.colors.ink }}>
    <FlexBox height="100%" flexDirection="column" alignItems="stretch" justifyContent="flex-start" padding="42px 54px">
      <Kicker>Rede</Kicker>
      <Heading color="ink" fontSize="46px" lineHeight={1.08} margin="0 0 10px">
        Descentralização em blockchain
      </Heading>
      <Text color="muted" fontSize="28px" fontWeight={700} lineHeight={1.25} margin="0 0 24px">
        O controle e a validação são distribuídos entre participantes independentes.
      </Text>
      <Box
        backgroundColor="white"
        padding="10px"
        border="2px solid #D7CEC1"
        style={{ borderRadius: 8, display: 'flex', flex: 1, minHeight: 0, justifyContent: 'center' }}
      >
        <Image
          src={descentralizedImage}
          alt="Representação visual de descentralização em blockchain"
          width="100%"
          style={{ maxHeight: '400px', objectFit: 'contain' }}
        />
      </Box>
    </FlexBox>
  </Slide>
);

const topics: Topic[] = [
  {
    chapter: 'Sistemas Distribuídos?',
    title: 'Ideia central',
    subtitle: (
      <>
        Blockchain deriva de <Keyword color="ink">sistemas distribuídos</Keyword> e <Keyword color="ink">criptografia</Keyword>
      </>
    ),
    bullets: [
      <>
        É um tipo especial de <Keyword color="ink">ledger distribuído</Keyword>.
      </>,
      <>
        A <Keyword color="ink">base de dados</Keyword> é replicada entre vários nós.
      </>,
      <>
        Atualizações entram por <Keyword color="ink">consenso</Keyword>.
      </>,
      <>
        Nas blockchains clássicas, transações são agrupadas em <Keyword color="ink">blocos encadeados</Keyword>.
      </>,
      <>
        Não é só Bitcoin: pode sustentar <Keyword color="ink">confiança descentralizada</Keyword>, registros verificáveis, contratos inteligentes e troca de valor.
      </>
    ],
    note: (
      <>
        O foco para Sistemas Distribuídos é entender blockchain como uma forma de manter estado compartilhado{' '}
        <Keyword color="ink">sem autoridade central única</Keyword>.
      </>
    )
  },
  {
    chapter: 'Sistemas Distribuídos?',
    title: 'Sistemas distribuídos',
    subtitle: 'Blockchain é, antes de tudo, cooperação entre nós',
    bullets: [
      'Vários nós trocam mensagens para manter uma visão comum do estado.',
      'Nós podem ser honestos, falhos ou maliciosos.',
      'Dois desafios fundamentais: coordenação entre nós e tolerância a falhas.',
      'Falhas bizantinas importam porque participantes podem agir de forma arbitrária.'
    ],
    note: (
      <>
        A dificuldade central não é armazenar dados em vários lugares; é fazer participantes independentes concordarem,
        com <Keyword color="ink">confiabilidade</Keyword>, sobre o estado aceito.
      </>
    ),
    tone: 'red'
  },
  {
    chapter: 'Capítulo 5 - Algoritmos de Consenso',
    title: 'Algoritmo de Consenso',
    subtitle: 'Lidando com Falhas Bizantinas',
    bullets: [
      <>
        <Keyword color="ink">Nós:</Keyword> offline, lentos, particionados ou <Keyword color="red">maliciosos</Keyword>.
      </>,
      <>
        <Keyword color="ink">Mensagens:</Keyword> atraso e chegada fora de ordem.
      </>,
      <>
        <Keyword color="green">Objetivo:</Keyword> convergir para uma decisão comum.
      </>,
      <>
        <Keyword color="red">Resumo:</Keyword> Problema dos <Keyword color="ink">Generais Bizantinos</Keyword>.
      </>
    ],
    note: 'Consenso define quais transações entram no histórico canônico e qual estado deve ser aceito pela rede.',
    tone: 'red'
  },
  {
    chapter: 'Sistemas Distribuídos?',
    title: 'Consistência Eventual',
    subtitle: 'De olho no Teorema CAP',
    bullets: [
      <>
        Um sistema distribuído <Keyword color="red">não garante simultaneamente</Keyword> consistência, disponibilidade e tolerância a partições.
      </>,
      <>
        Em uma partição de rede, é preciso escolher <Keyword color="ink">duas características</Keyword> entre consistência, disponibilidade e tolerância a partições.
      </>,
      <>
        Blockchains públicas tendem a favorecer <Keyword color="green">disponibilidade</Keyword> e <Keyword color="green">tolerância a partições</Keyword>.
      </>,
      <>
        <Keyword color="ink">Consistência Eventual:</Keyword> a consistência surge com o tempo, por consenso e confirmações sucessivas.
      </>
    ],
    image: {
      src: capImage,
      alt: 'Diagrama do teorema CAP'
    }
  },
  {
    chapter: 'Sistemas Distribuídos?',
    title: 'PACELC',
    subtitle: 'Além de partições, há trade-off entre latência e consistência',
    bullets: [
      'PACELC estende a discussão do CAP.',
      'Se há partição, aparece o trade-off disponibilidade versus consistência.',
      'Mesmo sem partição, sistemas replicados enfrentam latência versus consistência.',
      'Quanto mais validação e garantias de consistência, maior tende a ser o impacto em latência e throughput.',
      'Isso ajuda a entender o custo de desempenho das blockchains.'
    ]
  },
  {
    chapter: 'Sistemas Distribuídos?',
    title: 'Evolução histórica',
    subtitle: 'Bitcoin combinou ideias anteriores em um sistema prático',
    bullets: [
      'Criptografia de chave pública.',
      'Árvores de Merkle.',
      'Assinaturas digitais.',
      'Tolerância a falhas bizantinas.',
      'Propostas anteriores de dinheiro eletrônico.',
      'Timestamping e registros resistentes à adulteração.',
      'Bitcoin surge em 2008 combinando essas ideias sem autoridade central.'
    ],
    tone: 'green'
  },
  {
    chapter: 'Sistemas Distribuídos?',
    title: 'Elementos recorrentes',
    bullets: [
      'Transações.',
      'Blocos.',
      'Hashes.',
      'Assinaturas digitais.',
      'Rede peer-to-peer.',
      'Consenso e validação.',
      'Replicação.',
      'Incentivos, quando há token nativo.'
    ],
    note: 'Esses elementos aparecem de formas diferentes em Bitcoin, Ethereum e outras redes.'
  },
  {
    chapter: 'Sistemas Distribuídos?',
    title: 'Benefícios',
    bullets: [
      'Descentralização e redução de intermediários.',
      'Transparência e auditabilidade.',
      'Imutabilidade prática dos registros.',
      'Alta disponibilidade por replicação.',
      'Segurança baseada em criptografia.',
      'Contratos inteligentes.',
      'Controle de ativos digitais escassos, evitando gasto ou posse duplicada.'
    ],
    tone: 'green'
  },
  {
    chapter: 'Sistemas Distribuídos?',
    title: 'Limitações',
    bullets: [
      'Escalabilidade inferior a sistemas financeiros tradicionais.',
      'Dificuldade regulatória.',
      'Problemas de privacidade em blockchains públicas.',
      'Maturidade ainda incompleta em segurança, governança e experiência de uso.',
      'Interoperabilidade com sistemas legados e entre blockchains.',
      'Barreiras de adoção e confiança.'
    ],
    tone: 'red'
  },
  {
    chapter: 'Sistemas Distribuídos?',
    title: 'Tipos de blockchain',
    subtitle: 'Toda blockchain é DLT, mas nem toda DLT é blockchain',
    bullets: [
      <>
        DLT é o termo mais amplo: <Keyword color="ink">distributed ledger technology</Keyword>.
      </>,
      <>
        Blockchain é um ledger distribuído organizado em <Keyword color="ink">blocos encadeados</Keyword>.
      </>
    ],
    customContent: (
      <Grid gridTemplateRows="auto 1fr" gridRowGap="24px" style={{ flex: 1 }}>
        <BulletList
          items={[
            <>
              DLT é o termo mais amplo: <Keyword color="ink">distributed ledger technology</Keyword>.
            </>,
            <>
              Blockchain é um ledger distribuído organizado em <Keyword color="ink">blocos encadeados</Keyword>.
            </>
          ]}
          fontSize="25px"
        />
        <Grid gridTemplateColumns="repeat(2, 1fr)" gridColumnGap="20px" gridRowGap="16px">
          <Card title="Públicas" tone="green" compact>
            Abertas e permissionless, como Bitcoin e Ethereum.
          </Card>
          <Card title="Privadas / consortium" tone="blue" compact>
            Restritas a grupos ou organizações, como Hyperledger Fabric e Quorum.
          </Card>
          <Card title="Semi-privadas" tone="yellow" compact>
            Modelos híbridos, com abertura parcial e algum controle institucional.
          </Card>
          <Card title="Permissioned ledgers" tone="red" compact>
            Participantes conhecidos e acesso controlado.
          </Card>
        </Grid>
      </Grid>
    )
  },
  {
    chapter: 'Sistemas Distribuídos?',
    title: 'Tokens, camadas e cadeias conectadas',
    bullets: [
      'Blockchains tokenizadas possuem token nativo, como Bitcoin e Ethereum.',
      'Tokenless blockchains focam em compartilhamento de dados sem criptoativo nativo.',
      'Layer 1: camada base de consenso e verdade canônica.',
      'Layer 2: soluções sobre uma Layer 1 para escalar ou adicionar privacidade.',
      'Sidechains: cadeias conectadas por pontes ou mecanismos de peg.'
    ]
  },
  {
    chapter: 'Rede',
    title: 'Ideia central',
    bullets: [
      'Descentralização é um benefício central da blockchain.',
      'Nenhuma autoridade única controla toda a rede.',
      'Controle é distribuído entre participantes.',
      'Decisões sobre o estado são tomadas por mecanismos de consenso.',
      'A blockchain não é apenas replicação de dados; sua governança também pode ser descentralizada.'
    ]
  },
  {
    chapter: 'Rede',
    title: 'Centralizado, distribuído e descentralizado',
    bullets: [
      'Centralizado: uma autoridade principal controla a operação.',
      'Distribuído: dados e computação ficam em vários nós, mas pode haver autoridade central.',
      'Descentralizado: não há controlador único; controle é distribuído.',
      'Um sistema pode ser tecnicamente distribuído e politicamente centralizado.',
      'Blockchains públicas buscam combinar distribuição técnica e descentralização de controle.'
    ]
  },
  {
    chapter: 'Rede',
    title: 'Descentralização em blockchain',
    bullets: [
      'Participantes mantêm cópias do estado da rede.',
      'Regras comuns validam transações e blocos.',
      'O consenso substitui uma autoridade confiável única.',
      'Usuários confiam no protocolo, na criptografia e no mecanismo de consenso.',
      'Descentralização varia em grau; nem todo caso exige descentralização total.'
    ]
  },
  {
    chapter: 'Rede',
    title: 'Métodos de descentralização',
    bullets: [
      'Desintermediação: remove bancos, cartórios, plataformas ou administradores únicos.',
      'Na desintermediação, o usuário interage diretamente com a rede.',
      'Pode aumentar controle sobre valor, identidade ou dados.',
      'Competição entre intermediários: reduz monopólio sem eliminar todos os intermediários.',
      'Contratos inteligentes podem escolher provedores por reputação, preço ou qualidade.'
    ]
  },
  {
    chapter: 'Rede',
    title: 'Nem tudo precisa de blockchain',
    bullets: [
      'O sistema exige alto throughput?',
      'As atualizações são controladas por entidade central?',
      'Os usuários confiam uns nos outros?',
      'Os usuários são anônimos?',
      'É necessário consenso entre participantes independentes?',
      'Imutabilidade forte é requisito?',
      'Se há confiança e controle central legítimo, banco tradicional pode ser melhor.'
    ],
    tone: 'red',
    customContent: (
      <FlexBox flex={1} alignItems="center">
        <Grid gridTemplateColumns="repeat(3, 1fr)" gridColumnGap="12px" gridRowGap="12px">
          <DecisionQuestionCard
            step="1"
            question="Quem controla as atualizações?"
            answer="Se uma entidade central já é legítima para validar e corrigir dados, um banco tradicional costuma ser mais simples e eficiente."
            tone="red"
          />
          <DecisionQuestionCard
            step="2"
            question="Os participantes confiam entre si?"
            answer="Blockchain faz mais sentido quando vários atores precisam cooperar sem depender plenamente de um intermediário comum."
            tone="yellow"
          />
          <DecisionQuestionCard
            step="3"
            question="É preciso consenso independente?"
            answer="O valor aparece quando a rede precisa concordar sobre um estado compartilhado, mesmo com nós falhos, lentos ou potencialmente maliciosos."
            tone="blue"
          />
          <DecisionQuestionCard
            step="4"
            question="Auditabilidade é requisito forte?"
            answer="Registros append-only, assinaturas e hashes ajudam quando alterações retroativas precisam ser detectáveis e verificáveis por terceiros."
            tone="green"
          />
          <DecisionQuestionCard
            step="5"
            question="O sistema exige muito throughput?"
            answer="Se volume, baixa latência e consultas flexíveis são prioridade absoluta, a sobrecarga de consenso pode pesar contra blockchain."
            tone="red"
          />
          <DecisionQuestionCard
            step="6"
            question="O que precisa ser descentralizado?"
            answer="Não basta espalhar servidores: dados, validação, governança, identidade, interface e infraestrutura podem concentrar poder."
            tone="blue"
          />
        </Grid>
      </FlexBox>
    )
  },
  {
    chapter: 'Rede',
    title: 'Nem tudo precisa de blockchain',
    bullets: [],
    tone: 'red',
    customContent: (
      <FlexBox flex={1} alignItems="center" justifyContent="center">
        <Box borderLeft={`9px solid ${theme.colors.red}`} padding="0 0 0 26px" width="88%">
          <Text color="ink" fontSize="36px" fontWeight={800} lineHeight={1.22} margin="0">
            A escolha deve começar pelo problema distribuído: blockchain compensa quando há atores independentes,
            baixa confiança mútua, necessidade de consenso e histórico verificável. Sem esses requisitos, ela tende a
            trocar simplicidade e desempenho por complexidade desnecessária.
          </Text>
        </Box>
      </FlexBox>
    )
  },
  {
    chapter: 'Capítulos 3 e 4 - Criptografia',
    title: 'Hashes criptográficos',
    bullets: [
      'Função hash recebe entrada arbitrária e produz saída fixa.',
      'Determinismo: mesma entrada gera mesmo hash.',
      'Resistência à pré-imagem e à segunda pré-imagem.',
      'Resistência a colisões.',
      'Efeito avalanche.',
      'Usos: blocos, Merkle trees, endereços, Proof of Work, transações e integridade do ledger.'
    ],
    customContent: (
      <FlexBox flex={1} alignItems="center" justifyContent="center">
        <Grid gridTemplateColumns="repeat(2, 1fr)" gridColumnGap="18px" gridRowGap="18px" alignItems="stretch" width="100%">
          <Card title="Entrada variável" tone="blue" compact>
            Recebe dados de qualquer tamanho: uma transação, um bloco, um arquivo ou um estado inteiro.
          </Card>
          <Card title="Saída fixa" tone="green" compact>
            Produz um digest de tamanho definido, funcionando como uma impressão digital compacta do dado.
          </Card>
          <Card title="Verificação barata" tone="yellow" compact>
            É fácil recalcular e comparar hashes para checar integridade sem reprocessar toda a história.
          </Card>
          <Card title="Alteração detectável" tone="red" compact>
            Uma pequena mudança na entrada muda drasticamente a saída, revelando adulteração.
          </Card>
        </Grid>
      </FlexBox>
    )
  },
  {
    chapter: 'Capítulos 3 e 4 - Criptografia',
    title: 'Representação da função hash',
    bullets: [],
    customContent: (
      <FlexBox flex={1} alignItems="center" justifyContent="center">
        <Box backgroundColor="navy" padding="36px 46px" width="72%" style={{ borderRadius: 8, textAlign: 'center' }}>
          <Text color="yellow" fontSize="22px" fontWeight={900} margin="0 0 16px">
            Representação
          </Text>
          <Text color="primary" fontSize="54px" fontWeight={900} lineHeight={1.12} margin="0">
            <Latex>{'$h = H(m)$'}</Latex>
          </Text>
          <Text color="primary" fontSize="24px" fontWeight={500} lineHeight={1.26} margin="20px 0 0">
            A função hash <Latex>{'$H$'}</Latex> transforma uma mensagem <Latex>{'$m$'}</Latex> em um digest{' '}
            <Latex>{'$h$'}</Latex> verificável.
          </Text>
        </Box>
      </FlexBox>
    )
  },
  {
    chapter: 'Capítulos 3 e 4 - Criptografia',
    title: 'Otimizando Consultas',
    subtitle: 'Outras aplicações da Função Hash',
    bullets: [
      'Transações ou dados ficam nas folhas.',
      'Pares de hashes são combinados até formar a Merkle root.',
      'Permite verificar pertencimento sem reprocessar tudo.',
      'É essencial para clientes leves.',
      'Bitcoin armazena a Merkle root no cabeçalho do bloco.',
      'Ethereum usa estruturas derivadas, como Merkle-Patricia tree, para estado e pares chave-valor.',
      'Se qualquer item muda, a raiz muda.'
    ],
    customContent: (
      <Grid gridTemplateColumns="0.88fr 1.12fr" gridColumnGap="24px" alignItems="center" style={{ flex: 1 }}>
        <Box>
          <Text color="ink" fontSize="24px" fontWeight={700} lineHeight={1.18} margin="0 0 14px">
            No Bitcoin, as transações de um bloco são resumidas em uma Merkle root armazenada no cabeçalho. Isso permite
            provar que uma transação pertence ao bloco sem baixar todas as transações.
          </Text>
          <Box borderLeft={`7px solid ${theme.colors.tertiary}`} padding="0 0 0 18px">
            <Text color="ink" fontSize="25px" fontWeight={800} lineHeight={1.14} margin="0">
              Ethereum generaliza a ideia.
            </Text>
            <Text color="muted" fontSize="18px" fontWeight={600} lineHeight={1.14} margin="6px 0 0">
              Usa estruturas derivadas, como Merkle-Patricia trees, para comprometer criptograficamente estado,
              transações e recibos.
            </Text>
          </Box>
        </Box>
        <Box backgroundColor="rgba(255,255,255,0.06)" padding="10px" border="2px solid #1E3348" style={{ borderRadius: 8 }}>
          <Image src={merkleImage} alt="Estrutura de uma Merkle tree" width="100%" style={{ maxHeight: '410px', objectFit: 'contain' }} />
        </Box>
      </Grid>
    )
  },
  {
    chapter: 'Capítulos 3 e 4 - Criptografia',
    title: 'Criptografia simétrica',
    bullets: [
      'A mesma chave cifra e decifra dados.',
      'Também chamada de chave compartilhada ou secreta.',
      'Cifras de fluxo cifram bit a bit ou byte a byte com keystream.',
      'Cifras de bloco dividem texto em blocos de tamanho fixo.',
      'AES usa blocos de 128 bits e chaves de 128, 192 ou 256 bits.',
      'Em blockchain, é usada para proteger dados auxiliares, como chaves privadas em carteiras.'
    ],
    customContent: (
      <FlexBox flex={1} alignItems="center" justifyContent="center">
        <Box borderLeft={`9px solid ${theme.colors.blue}`} padding="0 0 0 28px" width="86%">
          <Text color="ink" fontSize="38px" fontWeight={700} lineHeight={1.24} margin="0">
            Criptografia simétrica é o modelo em que o mesmo segredo é usado para proteger e recuperar uma informação:
            quem conhece a chave consegue cifrar e decifrar os dados.
          </Text>
          <Text color="muted" fontSize="24px" fontWeight={700} lineHeight={1.22} margin="20px 0 0">
            O ponto central deixa de ser provar identidade publicamente; passa a ser manter a chave compartilhada em sigilo.
          </Text>
        </Box>
      </FlexBox>
    )
  },
  {
    chapter: 'Capítulos 3 e 4 - Criptografia',
    title: 'Criptografia assimétrica',
    bullets: [
      'Usa par de chaves: privada e pública.',
      'Chave privada permanece secreta.',
      'Chave pública pode ser divulgada.',
      'Permite provar controle da chave privada sem revelá-la.',
      'Em Bitcoin e Ethereum, posse de ativos está ligada ao controle da chave privada.',
      'Qualquer nó pode verificar assinatura com dados públicos.'
    ],
    customContent: (
      <Grid gridTemplateColumns="0.82fr 1.18fr" gridColumnGap="24px" alignItems="center" style={{ flex: 1 }}>
        <Box>
          <Text color="ink" fontSize="25px" fontWeight={700} lineHeight={1.2} margin="0 0 16px">
            Criptografia assimétrica usa um par de chaves: a chave pública pode ser compartilhada, enquanto a chave
            privada permanece secreta.
          </Text>
          <Box borderLeft={`7px solid ${theme.colors.blue}`} padding="0 0 0 18px">
            <Text color="ink" fontSize="24px" fontWeight={800} lineHeight={1.14} margin="0">
              Encriptação e decriptação
            </Text>
            <Text color="muted" fontSize="18px" fontWeight={600} lineHeight={1.16} margin="6px 0 0">
              A mensagem pode ser cifrada com a chave pública do receptor; somente a chave privada correspondente
              consegue recuperar o plaintext.
            </Text>
          </Box>
        </Box>
        <Box backgroundColor="rgba(255,255,255,0.06)" padding="10px" border="2px solid #1E3348" style={{ borderRadius: 8 }}>
          <Image src={encDecImage} alt="Processo de encriptação e decriptação com criptografia assimétrica" width="100%" style={{ maxHeight: '390px', objectFit: 'contain' }} />
        </Box>
      </Grid>
    )
  },
  {
    chapter: 'Capítulos 3 e 4 - Criptografia',
    title: 'Assinaturas digitais',
    bullets: [
      'Associam uma mensagem a quem controla uma chave privada.',
      'Usuário cria uma transação.',
      'Transação é assinada com a chave privada.',
      'A rede verifica a assinatura com dados públicos.',
      'Se a assinatura é válida, a rede aceita a autorização.',
      'A chave privada nunca precisa ser revelada.'
    ],
    customContent: (
      <Grid gridTemplateColumns="0.82fr 1.18fr" gridColumnGap="24px" alignItems="center" style={{ flex: 1 }}>
        <Box>
          <Text color="ink" fontSize="25px" fontWeight={700} lineHeight={1.2} margin="0 0 16px">
            Em assinaturas digitais, a direção muda: o emissor assina com sua chave privada, e qualquer participante
            verifica a assinatura com a chave pública.
          </Text>
          <Box borderLeft={`7px solid ${theme.colors.green}`} padding="0 0 0 18px">
            <Text color="ink" fontSize="24px" fontWeight={800} lineHeight={1.14} margin="0">
              Prova de autorização
            </Text>
            <Text color="muted" fontSize="18px" fontWeight={600} lineHeight={1.16} margin="6px 0 0">
              Em blockchains, isso permite validar que uma transação foi autorizada por quem controla a chave privada,
              sem expor essa chave para a rede.
            </Text>
          </Box>
        </Box>
        <Box backgroundColor="rgba(255,255,255,0.06)" padding="10px" border="2px solid #1E3348" style={{ borderRadius: 8 }}>
          <Image src={validPubImage} alt="Processo de assinatura com chave privada e validação com chave pública" width="100%" style={{ maxHeight: '390px', objectFit: 'contain' }} />
        </Box>
      </Grid>
    )
  },
  {
    chapter: 'Capítulo 5 - Algoritmos de Consenso',
    title: 'Ideia central',
    subtitle: 'Como a rede decide qual estado é aceito',
    bullets: [
      'Consenso é o mecanismo que permite que nós independentes concordem sobre uma versão comum do histórico.',
      'Em blockchain, ele define quais transações entram em blocos e qual cadeia representa o estado canônico.',
      'O desafio é chegar a acordo mesmo com atrasos, falhas, partições e participantes potencialmente maliciosos.',
      'A escolha do algoritmo afeta segurança, descentralização, custo, latência e throughput.'
    ],
    note: (
      <>
        Para Sistemas Distribuídos, consenso é o ponto em que replicação deixa de ser apenas cópia de dados e vira{' '}
        <Keyword color="ink">decisão coordenada</Keyword> sobre o estado.
      </>
    ),
    tone: 'red'
  },
  {
    chapter: 'Capítulo 5 - Algoritmos de Consenso',
    title: 'Pensando nas falhas',
    subtitle: 'Que tipo de falha o consenso precisa tolerar?',
    bullets: [
      'CFT, ou Crash Fault Tolerance, tolera falhas simples, como nós que param de funcionar.',
      'BFT, ou Byzantine Fault Tolerance, tolera comportamento malicioso ou arbitrário.',
      'Blockchains públicas precisam assumir um ambiente mais próximo de BFT.',
      'O algoritmo deve manter segurança mesmo quando alguns participantes mentem, atrasam mensagens ou tentam manipular o histórico.',
      'Essa exigência explica por que consenso em blockchain é mais caro que replicação tradicional.'
    ],
    tone: 'red',
    customContent: (
      <FlexBox flex={1} alignItems="center" justifyContent="center">
        <Grid gridTemplateColumns="repeat(2, 1fr)" gridColumnGap="24px" width="100%">
          <Card title="CFT - Crash Fault Tolerance" tone="blue">
            Tolera falhas simples, como nós que param de funcionar, ficam offline ou deixam de responder. É um modelo
            útil quando a falha é parada, não comportamento malicioso.
          </Card>
          <Card title="BFT - Byzantine Fault Tolerance" tone="red">
            Tolera comportamento malicioso ou arbitrário: nós podem mentir, atrasar mensagens ou tentar manipular o
            histórico. Blockchains públicas precisam assumir esse cenário.
          </Card>
        </Grid>
      </FlexBox>
    )
  },
  {
    chapter: 'Capítulo 5 - Algoritmos de Consenso',
    title: 'Proof of Work',
    subtitle: 'Segurança por custo computacional',
    bullets: [
      'Mineradores competem para encontrar um bloco cujo hash satisfaça a dificuldade da rede.',
      'O nonce é variado para tentar produzir um hash abaixo do alvo definido pelo protocolo.',
      'A prova é cara para produzir, mas barata para qualquer nó verificar.',
      'Reescrever o histórico exigiria refazer o trabalho acumulado e superar a cadeia honesta.',
      'O custo principal aparece em energia, hardware e menor throughput.'
    ],
    tone: 'red',
    customContent: (
      <Grid gridTemplateColumns="0.82fr 1.18fr" gridColumnGap="24px" alignItems="center" style={{ flex: 1 }}>
        <Box>
          <BulletList
            items={[
              <>
                Mineradores fazem uma <Keyword color="blue">busca linear O(n)</Keyword>: variam o <Keyword color="ink">nonce</Keyword> até encontrar um hash abaixo do alvo.
              </>,
              <>
                O cabeçalho passa pela <Keyword color="ink">função hash</Keyword>.
              </>,
              <>
                O resultado precisa ficar abaixo do <Keyword color="red">target</Keyword>.
              </>,
              <>
                A prova é <Keyword color="red">cara de produzir</Keyword> e barata de verificar.
              </>,
              <>
                Reescrever histórico exige refazer o <Keyword color="ink">trabalho acumulado</Keyword>.
              </>
            ]}
            fontSize="22px"
            itemMargin="0 0 10px"
          />
        </Box>
        <Box backgroundColor="rgba(255,255,255,0.06)" padding="10px" border="2px solid #1E3348" style={{ borderRadius: 8 }}>
          <Image src={powImage} alt="Processo de tentativa de nonce no Proof of Work" width="100%" style={{ maxHeight: '360px', objectFit: 'contain' }} />
        </Box>
      </Grid>
    )
  },
  {
    chapter: 'Capítulo 5 - Algoritmos de Consenso',
    title: 'Proof of Stake',
    subtitle: 'Segurança por capital em risco',
    bullets: [
      'Em vez de gastar energia e poder computacional, validadores participam com stake bloqueado.',
      'A chance de propor ou validar blocos depende das regras econômicas do protocolo.',
      'Comportamento malicioso pode ser punido com perda parcial ou total do stake.',
      'O objetivo é reduzir custo energético sem abandonar incentivo econômico e validação distribuída.'
    ],
    tone: 'green',
    customContent: (
      <Grid gridTemplateColumns="0.82fr 1.18fr" gridColumnGap="24px" alignItems="center" style={{ flex: 1 }}>
        <Box>
          <BulletList
            items={[
              <>
                Validadores bloqueiam <Keyword color="ink">stake</Keyword>.
              </>,
              <>
                O protocolo calcula quem pode <Keyword color="green">propor</Keyword> ou validar.
              </>,
              <>
                A seleção depende das <Keyword color="ink">regras econômicas</Keyword>.
              </>,
              <>
                Fraude pode gerar <Keyword color="red">perda de stake</Keyword>.
              </>,
              <>
                Reduz custo energético sem remover <Keyword color="ink">incentivo econômico</Keyword>.
              </>
            ]}
            fontSize="22px"
            itemMargin="0 0 10px"
          />
        </Box>
        <Box backgroundColor="rgba(255,255,255,0.06)" padding="10px" border="2px solid #1E3348" style={{ borderRadius: 8 }}>
          <Image src={posImage} alt="Processo de seleção de proponente no Proof of Stake" width="100%" style={{ maxHeight: '360px', objectFit: 'contain' }} />
        </Box>
      </Grid>
    )
  },
  {
    chapter: 'Capítulo 5 - Algoritmos de Consenso',
    title: 'Trade-offs de consenso',
    bullets: [
      'Mais descentralização pode aumentar latência e custo de coordenação.',
      'Mais desempenho pode exigir menos participantes, mais confiança ou maior centralização.',
      'Finalidade pode ser probabilística, como em cadeias baseadas em maior trabalho acumulado.',
      'Em modelos permissionados, consenso pode ser mais rápido, mas depende de participantes conhecidos.',
      'Não existe algoritmo universal: o desenho depende do ambiente de confiança e do caso de uso.'
    ],
    note: (
      <>
        A pergunta prática é: <Keyword color="ink">quem pode propor blocos, quem valida e qual custo existe para trapacear?</Keyword>
      </>
    ),
    tone: 'yellow'
  },
  {
    chapter: 'Capítulo 7 - Bitcoin',
    title: 'Chaves e posse',
    bullets: [
      'Bitcoin não armazena “moedas” em contas tradicionais.',
      'O controle vem da chave privada.',
      'A chave pública ou endereço permite verificação.',
      'Assinaturas digitais demonstram autorização para gastar.',
      'Quem controla a chave controla a capacidade de movimentar fundos.'
    ],
    customContent: (
      <FlexBox flex={1} alignItems="center" justifyContent="center">
        <Box borderLeft={`9px solid ${theme.colors.tertiary}`} padding="0 0 0 28px" width="86%">
          <Text color="ink" fontSize="38px" fontWeight={800} lineHeight={1.22} margin="0">
            Bitcoin não guarda moedas em contas tradicionais: ele registra saídas gastáveis. A posse prática vem de
            controlar a <Keyword color="ink">chave privada</Keyword>, que permite assinar transações e demonstrar
            autorização para mover fundos.
          </Text>
        </Box>
      </FlexBox>
    )
  },
  {
    chapter: 'Capítulo 7 - Bitcoin',
    title: 'Script Language',
    bullets: [
      'Bitcoin possui linguagem de script limitada.',
      'Scripts expressam condições de gasto.',
      'A linguagem é deliberadamente restrita.',
      'Não é Turing-completa.',
      'A restrição reduz superfície para lógica complexa.'
    ],
    customContent: (
      <FlexBox flex={1} alignItems="center" justifyContent="center">
        <Grid gridTemplateColumns="repeat(2, 1fr)" gridColumnGap="18px" gridRowGap="18px" width="100%">
          <Card title="Condições de gasto" tone="blue" compact>
            Scripts definem o que precisa ser provado para gastar uma saída, como uma assinatura válida.
          </Card>
          <Card title="Linguagem limitada" tone="green" compact>
            Bitcoin usa uma linguagem de script deliberadamente restrita, focada em regras simples de gasto.
          </Card>
          <Card title="Não Turing-completa" tone="yellow" compact>
            A linguagem evita loops e lógica arbitrária, reduzindo riscos de execução imprevisível.
          </Card>
          <Card title="Menos superfície" tone="red" compact>
            A restrição diminui espaço para lógica complexa e ajuda a manter validação simples pelos nós.
          </Card>
        </Grid>
      </FlexBox>
    )
  },
  {
    chapter: 'Capítulo 7 - Bitcoin',
    title: 'Estrutura do Bloco',
    bullets: [
      'Blocos agrupam transações.',
      'Cada bloco referencia o anterior por hash.',
      'Cabeçalho inclui dados usados para validação e Proof of Work.',
      'Merkle root resume as transações do bloco.',
      'Alterar uma transação altera a Merkle root e quebra a cadeia de hashes.'
    ],
    customContent: (
      <Grid gridTemplateColumns="0.72fr 1.28fr" gridColumnGap="24px" alignItems="center" style={{ flex: 1 }}>
        <FlexBox alignItems="center" height="100%">
          <Text color="ink" fontSize="28px" fontWeight={700} lineHeight={1.28} margin="0">
            Blocos agrupam <Keyword color="ink">transações</Keyword>.
          </Text>
        </FlexBox>
        <Box backgroundColor="rgba(255,255,255,0.06)" padding="10px" border="2px solid #1E3348" style={{ borderRadius: 8 }}>
          <Image src={blockBitcoinImage} alt="Estrutura de blocos, cabeçalho e transações no Bitcoin" width="100%" style={{ maxHeight: '395px', objectFit: 'contain' }} />
        </Box>
      </Grid>
    )
  },
  {
    chapter: 'Capítulo 7 - Bitcoin',
    title: 'Mineração e Proof of Work',
    bullets: [
      'Mineradores competem para encontrar bloco válido.',
      'O bloco precisa atender à dificuldade da rede.',
      'Proof of Work torna caro propor blocos e reescrever histórico.',
      'Refazer o passado exige refazer trabalho acumulado.',
      'Nós não confiam no minerador: verificam blocos, transações e regras.'
    ],
    tone: 'red'
  },
  {
    chapter: 'Capítulo 7 - Bitcoin',
    title: 'Rede peer-to-peer',
    bullets: [
      'Transações e blocos são propagados entre pares.',
      'Nós validam informações recebidas.',
      'A rede converge para uma visão compartilhada do histórico.',
      'A cadeia com maior trabalho acumulado tende a ser aceita.',
      'A disponibilidade vem da replicação entre muitos nós.'
    ],
    customContent: (
      <FlexBox flex={1} alignItems="center" justifyContent="center">
        <Grid gridTemplateColumns="repeat(2, 1fr)" gridColumnGap="18px" gridRowGap="18px" width="100%">
          <Card title="Propagação" tone="blue" compact>
            Transações e blocos circulam entre pares, sem depender de um servidor central.
          </Card>
          <Card title="Validação local" tone="green" compact>
            Cada nó verifica as informações recebidas antes de repassar ou aceitar dados.
          </Card>
          <Card title="Convergência" tone="yellow" compact>
            A rede converge para uma visão comum; em PoW, a cadeia com maior trabalho acumulado tende a ser aceita.
          </Card>
          <Card title="Disponibilidade" tone="red" compact>
            A replicação entre muitos nós mantém os dados acessíveis mesmo com falhas.
          </Card>
        </Grid>
      </FlexBox>
    )
  },
  {
    chapter: 'Capítulo 7 - Bitcoin',
    title: 'Carteiras',
    bullets: [
      'Carteiras não armazenam bitcoins diretamente.',
      'Armazenam e gerenciam chaves privadas.',
      'Criam e assinam transações.'
    ],
    customContent: (
      <FlexBox flex={1} alignItems="center" justifyContent="center">
        <Box borderLeft={`9px solid ${theme.colors.green}`} padding="0 0 0 28px" width="86%">
          <Text color="ink" fontSize="40px" fontWeight={800} lineHeight={1.2} margin="0">
            Uma carteira Bitcoin não guarda moedas: ela guarda e gerencia a{' '}
            <Keyword color="ink">chave privada</Keyword> usada para autorizar transações.
          </Text>
        </Box>
      </FlexBox>
    )
  },
  {
    chapter: 'Capítulo 8 - Smart Contracts',
    title: 'Definição',
    bullets: [],
    customContent: (
      <FlexBox flex={1} alignItems="center" justifyContent="center">
        <Grid gridTemplateColumns="1fr" gridRowGap="20px" width="100%">
          <Box borderLeft={`9px solid ${theme.colors.tertiary}`} padding="0 0 0 28px">
            <Text color="ink" fontSize="32px" fontWeight={800} lineHeight={1.22} margin="0">
              Um smart contract é um <Keyword color="ink">programa seguro e imparável</Keyword> que representa um acordo, sendo automaticamente executável e aplicável.
            </Text>
          </Box>
          <Grid gridTemplateColumns="repeat(3, 1fr)" gridColumnGap="16px">
            <Card title="Programa" tone="blue" compact>
              Compreensível por uma máquina e executado pela rede de forma determinística.
            </Card>
            <Card title="Acordo" tone="green" compact>
              Representa uma regra de negócio, lógica ou acordo entre partes.
            </Card>
            <Card title="Automático" tone="yellow" compact>
              Executa de forma automática quando as condições previamente codificadas são atendidas.
            </Card>
          </Grid>
        </Grid>
      </FlexBox>
    )
  },
  {
    chapter: 'Capítulo 8 - Smart Contracts',
    title: 'Bitcoin e Ethereum',
    bullets: [
      'Bitcoin já possui script para condições simples de gasto.',
      'A linguagem de Bitcoin é restrita e não Turing-completa.',
      'Ethereum permite programas mais gerais.',
      'Contratos rodam em uma máquina virtual.',
      'Isso amplia o que a blockchain consegue representar.'
    ],
    customContent: (
      <FlexBox flex={1} alignItems="center" justifyContent="center">
        <Grid gridTemplateColumns="0.82fr 1fr 1fr" width="100%" style={{ border: `2px solid ${theme.colors.line}`, borderRadius: 8, overflow: 'hidden' }}>
          {['Elemento', 'Bitcoin', 'Ethereum'].map((heading) => (
            <Box key={heading} backgroundColor="navy" padding="4px 12px">
              <Text color="primary" fontSize="19px" fontWeight={950} lineHeight={1.05} margin="0">
                {heading}
              </Text>
            </Box>
          ))}
          {[
            ['Modelo', 'Rede focada em dinheiro digital e validação de gastos.', 'Plataforma para estado compartilhado e execução programável.'],
            ['Smart contracts', 'Scripts com condições simples para gastar UTXOs.', 'Contratos com lógica geral executada pela rede.'],
            ['Linguagem', 'Restrita e não Turing-completa.', 'Solidity/Vyper compilam para bytecode.'],
            ['Impacto', 'Segurança e previsibilidade para pagamentos.', 'DApps, tokens, DAOs e regras de negócio on-chain.']
          ].flatMap((row, rowIndex) =>
            row.map((cell, cellIndex) => (
              <Box
                key={`${rowIndex}-${cellIndex}`}
                backgroundColor={rowIndex % 2 === 0 ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)'}
                borderTop={`2px solid ${theme.colors.line}`}
                borderLeft={cellIndex === 0 ? '0' : `2px solid ${theme.colors.line}`}
                padding="2px 10px"
              >
                <Text color={cellIndex === 0 ? 'tertiary' : 'ink'} fontSize={cellIndex === 0 ? '17px' : '16px'} fontWeight={cellIndex === 0 ? 900 : 550} lineHeight={1.05} margin="0">
                  {cell}
                </Text>
              </Box>
            ))
          )}
        </Grid>
      </FlexBox>
    )
  },
  {
    chapter: 'Capítulo 8 - Smart Contracts',
    title: 'DApps',
    bullets: [
      'Aplicações descentralizadas rodam sobre blockchain ou ledger distribuído.',
      'Combinam interface de usuário, contratos inteligentes e blockchain como backend.',
      'Podem usar tokens ou incentivos.',
      'Critérios: descentralização, código aberto ou auditável, criptografia, incentivos quando fizer sentido e consenso para atualizações relevantes.',
      'DApps substituem backend centralizado por infraestrutura de estado e regras em rede.'
    ],
    customContent: (
      <FlexBox flex={1} alignItems="center" justifyContent="center">
        <Grid gridTemplateColumns="repeat(3, 1fr)" gridColumnGap="18px" gridRowGap="18px" width="100%">
          <Card title="Interface" tone="blue" compact>
            Camada visível para usuários interagirem com ativos, dados e regras da aplicação.
          </Card>
          <Card title="Contratos" tone="green" compact>
            Regras de negócio executadas de forma verificável sobre o estado compartilhado.
          </Card>
          <Card title="Blockchain" tone="yellow" compact>
            Backend descentralizado que registra estado, transações e consenso.
          </Card>
          <Card title="Critérios" tone="red" compact>
            Descentralização, criptografia, auditabilidade e governança por consenso quando necessário.
          </Card>
          <Card title="Incentivos" tone="green" compact>
            Tokens podem alinhar participação, segurança, uso e manutenção da rede.
          </Card>
          <Card title="Resultados" tone="blue" compact>
            Menos dependência de backend centralizado para regras e estado crítico.
          </Card>
        </Grid>
      </FlexBox>
    )
  },
  {
    chapter: 'Capítulo 8 - Smart Contracts',
    title: 'Web 1, Web 2 e Web 3',
    bullets: [
      'Web 1: páginas estáticas e leitura de conteúdo.',
      'Web 2: aplicações interativas, redes sociais, plataformas e serviços centralizados.',
      'Web 3: identidade, dados, ativos e aplicações menos dependentes de grandes intermediários.',
      'Na Web 2, poucas empresas concentram dados e controle.',
      'Web 3 usa blockchain, protocolos peer-to-peer e identidade descentralizada.'
    ],
    customContent: (
      <FlexBox flex={1} alignItems="center" justifyContent="center">
        <Grid gridTemplateColumns="repeat(3, 1fr)" gridColumnGap="18px" width="100%">
          {[
            {
              title: 'Web 1',
              tone: 'blue' as Tone,
              items: ['Páginas estáticas.', 'Leitura de conteúdo.', 'Pouca interação do usuário.']
            },
            {
              title: 'Web 2',
              tone: 'yellow' as Tone,
              items: ['Aplicações interativas.', 'Redes sociais e plataformas.', 'Dados e controle concentrados em grandes intermediários.']
            },
            {
              title: 'Web 3',
              tone: 'green' as Tone,
              items: ['Identidade, dados e ativos sob maior controle do usuário.', 'Blockchain e protocolos peer-to-peer.', 'Aplicações menos dependentes de intermediários centrais.']
            }
          ].map((card, index) => (
            <Box
              key={card.title}
              backgroundColor="rgba(255,255,255,0.06)"
              border={`3px solid ${theme.colors[card.tone]}`}
              padding="22px"
              minHeight="260px"
              style={{
                borderRadius: 8,
                transform: `translateY(${index * 18}px)`
              }}
            >
              <Text color={card.tone} fontSize="26px" fontWeight={900} margin="0 0 14px">
                {card.title}
              </Text>
              <BulletList items={card.items} fontSize="21px" itemMargin="0 0 8px" />
            </Box>
          ))}
        </Grid>
      </FlexBox>
    )
  },
  {
    chapter: 'Capítulo 8 - Smart Contracts',
    title: 'Oráculos',
    bullets: [
      'Blockchains são sistemas fechados.',
      'Contratos não acessam sozinhos preço, clima, eleição, atraso de voo ou sensores.',
      'Oráculo conecta mundo externo e blockchain.',
      'Coleta dados fora da cadeia e entrega ao contrato.',
      'Deve oferecer autenticidade, integridade e confiabilidade.',
      'O problema: oráculos reintroduzem confiança em terceiros.'
    ],
    image: {
      src: oracleImage,
      alt: 'Representação de oráculo conectando dados externos a smart contracts'
    },
    tone: 'red'
  },
  {
    chapter: 'Capítulo 8 - Smart Contracts',
    title: 'Tipos de oráculos',
    bullets: [
      'Entrada: levam dados externos para a blockchain.',
      'Saída: levam eventos da blockchain para sistemas externos.',
      'Hardware: usam sensores e dispositivos físicos.',
      'Computacionais: executam cálculos pesados fora da cadeia.',
      'Agregadores: combinam múltiplas fontes.',
      'Descentralizados: tentam preservar a lógica de descentralização.',
      'Criptoeconômicos: usam incentivos e penalidades.'
    ],
    customContent: (
      <FlexBox flex={1} alignItems="center" justifyContent="center">
        <Grid gridTemplateColumns="repeat(3, 1fr)" gridColumnGap="16px" gridRowGap="16px" width="100%">
          <Card title="Entrada" tone="blue" compact>
            Levam dados externos para a blockchain.
          </Card>
          <Card title="Saída" tone="green" compact>
            Levam eventos da blockchain para sistemas externos.
          </Card>
          <Card title="Hardware" tone="yellow" compact>
            Usam sensores e dispositivos físicos.
          </Card>
        </Grid>
      </FlexBox>
    )
  },
  {
    chapter: 'Capítulo 8 - Smart Contracts',
    title: 'Tipos de oráculos',
    bullets: [
      'Computacionais: executam cálculos pesados fora da cadeia.',
      'Agregadores: combinam múltiplas fontes.',
      'Descentralizados: tentam preservar a lógica de descentralização.',
      'Criptoeconômicos: usam incentivos e penalidades.'
    ],
    customContent: (
      <FlexBox flex={1} alignItems="center" justifyContent="center">
        <Grid gridTemplateColumns="repeat(2, 1fr)" gridColumnGap="18px" gridRowGap="18px" width="100%">
          <Card title="Computacionais" tone="red" compact>
            Executam cálculos pesados fora da cadeia.
          </Card>
          <Card title="Agregadores" tone="blue" compact>
            Combinam múltiplas fontes para reduzir dependência de um único provedor.
          </Card>
          <Card title="Descentralizados" tone="green" compact>
            Tentam preservar a lógica de descentralização com várias fontes ou nós.
          </Card>
          <Box
            backgroundColor="rgba(255,255,255,0.06)"
            border={`3px solid ${theme.colors.yellow}`}
            padding="14px 16px"
            minHeight="108px"
            style={{ borderRadius: 8 }}
          >
            <Text color="yellow" fontSize="21px" fontWeight={800} margin="0 0 4px">
              Criptoeconômicos
            </Text>
            <Text color="ink" fontSize="20px" fontWeight={500} lineHeight={1.24} margin="0">
              Usam incentivos e penalidades para induzir comportamento honesto na entrega dos dados.
            </Text>
          </Box>
        </Grid>
      </FlexBox>
    )
  },
  {
    chapter: 'Capítulo 8 - Smart Contracts',
    title: 'DAO',
    bullets: [
      'DAO significa organização autônoma descentralizada.',
      'Regras de participação e decisão são codificadas em smart contracts.',
      'Tokens ou votos podem representar poder de governança.',
      'A tesouraria e as propostas ficam coordenadas por regras executadas em rede.',
      'O objetivo é reduzir dependência de uma autoridade administrativa central.'
    ],
    customContent: (
      <FlexBox flex={1} alignItems="center" justifyContent="center">
        <Grid gridTemplateColumns="repeat(2, 1fr)" gridColumnGap="18px" gridRowGap="18px" width="100%">
          <Card title="Organização" tone="blue" compact>
            Grupo coordenado por regras comuns, sem administração central única.
          </Card>
          <Card title="Smart contracts" tone="green" compact>
            Regras de propostas, votos, fundos e execução ficam codificadas.
          </Card>
          <Card title="Governança" tone="yellow" compact>
            Tokens, votos ou permissões definem quem participa das decisões.
          </Card>
          <Card title="Tesouraria" tone="red" compact>
            Recursos podem ser movimentados conforme decisões aceitas pela rede.
          </Card>
        </Grid>
      </FlexBox>
    )
  },
  {
    chapter: 'Capítulo 8 - Smart Contracts',
    title: 'The DAO',
    bullets: [
      'The DAO era um smart contract para plataforma de investimento.',
      'Em 2016, vulnerabilidade de reentrância permitiu retirar fundos repetidamente.',
      'O contrato executou o que estava programado, mas o programa tinha falha.',
      'O caso questiona a ideia simples de “código é lei”.',
      'Houve hard fork no Ethereum para recuperar fundos.',
      'Parte da comunidade manteve a cadeia original, originando Ethereum Classic.'
    ],
    tone: 'red',
    customContent: (
      <FlexBox flex={1} alignItems="center" justifyContent="center">
        <Box width="92%" borderLeft={`5px solid ${theme.colors.red}`} padding="0 0 0 16px">
          {[
            {
              term: '2016',
              text: 'The DAO operava como um smart contract para uma plataforma de investimento.'
            },
            {
              term: 'Reentrância',
              text: 'Uma vulnerabilidade permitiu retirar fundos repetidamente antes de atualizar o estado.'
            },
            {
              term: 'Código executado',
              text: 'O contrato fez o que estava programado, mas o programa continha uma falha crítica.'
            },
            {
              term: 'Código é lei?',
              text: 'O caso mostrou o limite entre execução automática, intenção humana e governança social.'
            },
            {
              term: 'Hard fork',
              text: 'A comunidade do Ethereum alterou a cadeia para recuperar fundos.'
            },
            {
              term: 'Ethereum Classic',
              text: 'Parte da comunidade manteve a cadeia original, originando outra rede.'
            }
          ].map((item) => (
            <Grid key={item.term} gridTemplateColumns="130px 1fr" gridColumnGap="14px" alignItems="start" margin="0 0 7px">
              <Text color="red" fontSize="19px" fontWeight={950} lineHeight={1.03} margin="0">
                {item.term}
              </Text>
              <Text color="ink" fontSize="20px" fontWeight={600} lineHeight={1.08} margin="0">
                {item.text}
              </Text>
            </Grid>
          ))}
        </Box>
      </FlexBox>
    )
  },
  {
    chapter: 'Capítulo 9 - Arquitetura do Ethereum',
    title: 'Conceitos Gerais',
    bullets: [
      'Ether, moeda nativa.',
      'Chaves e endereços.',
      'Contas.',
      'Transações e mensagens.',
      'Ethereum Virtual Machine.',
      'Blockchain e estado global.',
      'Nós, clientes e rede peer-to-peer.',
      'Smart contracts, carteiras e protocolos de suporte como Whisper e Swarm.'
    ],
    customContent: (
      <FlexBox flex={1} alignItems="center" justifyContent="center">
        <Grid gridTemplateColumns="repeat(2, 1fr)" gridColumnGap="18px" gridRowGap="18px" width="100%">
          <Card title="Contas" tone="blue" compact>
            Ao contrário do Bitcoin, o Ethereum usa um modelo de saldo por conta. Contas externas são controladas por chave privada; contas de contrato têm código e estado próprios.
          </Card>
          <Card title="Estado Global" tone="green" compact>
            Além de blocos, o Ethereum mantém um estado global com saldos, código e armazenamento de contratos.
          </Card>
          <Card title="EVM" tone="red" compact>
            Máquina virtual que executa contratos em bytecode. Determinística, isolada e projetada para rodar código não confiável em toda a rede.
          </Card>
          <Card title="Gas" tone="yellow" compact>
            Unidade que precifica cada operação na EVM. Paga validadores, limita execuções e protege a rede contra uso abusivo.
          </Card>
        </Grid>
      </FlexBox>
    )
  },
];

const hiddenChapter1Titles = new Set([
  'PACELC',
  'Evolução histórica',
  'Elementos recorrentes',
  'Benefícios',
  'Limitações',
  'Tipos de blockchain',
  'Tokens, camadas e cadeias conectadas'
]);
const chapter1Topics = topics.filter((topic) => topic.chapter === 'Sistemas Distribuídos?' && !hiddenChapter1Titles.has(topic.title));
const hiddenChapter2Titles = new Set([
  'Ideia central',
  'Centralizado, distribuído e descentralizado',
  'Métodos de descentralização',
  'Nem tudo precisa de blockchain'
]);
const chapter2Topics = topics.filter((topic) => topic.chapter === 'Rede' && !hiddenChapter2Titles.has(topic.title));
const structureHashTitles = new Set(['Hashes criptográficos', 'Representação da função hash', 'Otimizando Consultas']);
const structureHashTopics = topics
  .filter((topic) => structureHashTitles.has(topic.title))
  .map((topic) => ({ ...topic, chapter: 'A Estrutura' }));
const cryptoTopics = topics
  .filter((topic) => topic.chapter === 'Capítulos 3 e 4 - Criptografia' && !structureHashTitles.has(topic.title))
  .map((topic) => ({ ...topic, chapter: 'Criptografia' }));
const consensusTopics = topics
  .filter((topic) => topic.chapter === 'Capítulo 5 - Algoritmos de Consenso' && topic.title !== 'Algoritmo de Consenso')
  .map((topic) => ({ ...topic, chapter: 'Consenso' }));
const bitcoinHiddenTitles = new Set(['Chaves e posse', 'Estrutura do Bloco', 'Mineração e Proof of Work', 'Carteiras', 'Rede peer-to-peer']);
const bitcoinTopics = topics
  .filter((topic) => topic.chapter === 'Capítulo 7 - Bitcoin' && !bitcoinHiddenTitles.has(topic.title))
  .map((topic) => ({ ...topic, chapter: 'Bitcoin' }));
const peerToPeerTopic = topics.find((topic) => topic.title === 'Rede peer-to-peer')!;
const smartContractTopicsRaw = topics
  .filter((topic) => topic.chapter === 'Capítulo 8 - Smart Contracts' && topic.title !== 'Bitcoin e Ethereum')
  .map((topic) => ({ ...topic, chapter: 'Smart Contracts' }));
const web3Topic = smartContractTopicsRaw.find((t) => t.title === 'Web 1, Web 2 e Web 3')!;
const smartContractTopics = smartContractTopicsRaw
  .filter((t) => t.title !== 'Web 1, Web 2 e Web 3')
  .reduce<typeof smartContractTopicsRaw>((acc, t) => {
    if (t.title === 'DApps') acc.push(web3Topic);
    acc.push(t);
    return acc;
  }, []);
const bitcoinEthereumTopic = { ...topics.find((topic) => topic.title === 'Bitcoin e Ethereum')!, chapter: 'Ethereum' };
const ethereumTopics = topics
  .filter((topic) => topic.chapter === 'Capítulo 9 - Arquitetura do Ethereum')
  .map((topic) => ({ ...topic, chapter: 'Ethereum' }))
  .filter((topic, index, arr) => arr.findIndex((t) => t.title === topic.title) === index);

const OracleProblemSlide = () => (
  <Slide backgroundColor="navy">
    <FlexBox height="100%" alignItems="center" justifyContent="center" padding="0 80px">
      <Heading color="primary" fontSize="52px" lineHeight={1.12} textAlign="center" margin="0">
        Como alimentar esses programas com dados do mundo real <Accent>sem depender de fontes confiáveis?</Accent>
      </Heading>
    </FlexBox>
  </Slide>
);

const ConceitosGeraisSlide = () => (
  <Slide backgroundColor="paper" style={{ background: theme.colors.paper, color: theme.colors.ink }}>
    <FlexBox height="100%" flexDirection="column" alignItems="stretch" justifyContent="flex-start" padding="42px 54px">
      <Kicker>Bitcoin</Kicker>
      <Heading color="ink" fontSize="46px" lineHeight={1.08} margin="0 0 20px">
        Conceitos Gerais
      </Heading>
      <Grid gridTemplateColumns="repeat(2, 1fr)" gridColumnGap="18px" gridRowGap="18px" style={{ flex: 1 }}>
        <Card title="Chaves e Posse" tone="blue" compact>
          Bitcoin não armazena moedas em contas. A posse vem do controle da <strong>chave privada</strong>, que autoriza transações por assinatura digital.
        </Card>
        <Card title="Estrutura do Bloco" tone="green" compact>
          Blocos agrupam <strong>transações</strong> e têm cabeçalho com hash anterior, Merkle root, timestamp, nonce e alvo de dificuldade.
        </Card>
        <Card title="Mineração" tone="red" compact>
          Mineradores competem para encontrar um hash válido via <strong>Proof of Work</strong>, tornando caro propor blocos e reescrever o histórico.
        </Card>
        <Card title="Carteiras" tone="yellow" compact>
          Carteiras não guardam moedas: armazenam e gerenciam a <strong>chave privada</strong> usada para assinar e autorizar transações.
        </Card>
      </Grid>
    </FlexBox>
  </Slide>
);

const bitcoinTxExamples = [
  {
    title: 'Exemplo 1',
    from: 'Alice',
    to: 'Bruno',
    amount: '0,015 BTC',
    fromAddress: 'bc1q...a92f',
    toAddress: 'bc1q...7k3d',
    key: 'chave privada de Alice'
  },
  {
    title: 'Exemplo 2',
    from: 'Bruno',
    to: 'Carla',
    amount: '0,006 BTC',
    fromAddress: 'bc1q...7k3d',
    toAddress: 'bc1q...p8m4',
    key: 'chave privada de Bruno'
  },
  {
    title: 'Exemplo 3',
    from: 'Carla',
    to: 'Diego',
    amount: '0,002 BTC',
    fromAddress: 'bc1q...p8m4',
    toAddress: 'bc1q...z1r9',
    key: 'chave privada de Carla'
  }
];

const BitcoinTransactionKeysSlide = () => (
  <Slide backgroundColor="paper" style={{ background: theme.colors.paper, color: theme.colors.ink }}>
    <FlexBox height="100%" flexDirection="column" alignItems="stretch" justifyContent="flex-start" padding="30px 54px">
      <Kicker>Bitcoin</Kicker>
      <Heading color="ink" fontSize="42px" lineHeight={1.06} margin="0 0 8px">
        Transações como eventos
      </Heading>
      <Text color="white" fontSize="21px" fontWeight={850} lineHeight={1.16} margin="0 0 14px">
        O Bitcoin não altera uma “conta” diretamente: ele acrescenta transações ao histórico. O estado de posse é derivado desse log.
      </Text>

      <div
        style={{
          height: 382,
          flex: '0 0 382px',
          border: '3px solid #FFFFFF',
          borderRadius: 8,
          background: '#020817',
          padding: 18,
          display: 'grid',
          gridTemplateRows: 'auto 1fr auto',
          rowGap: 14
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'center',
            columnGap: 16
          }}
        >
          <div style={{ color: '#FF6B3A', fontSize: 23, fontWeight: 950 }}>Log append-only da blockchain</div>
          <div style={{ color: '#FFFFFF', fontSize: 30, fontWeight: 950 }}>→</div>
          <div style={{ color: '#FFFFFF', fontSize: 19, fontWeight: 900, textAlign: 'right' }}>
            Cada bloco guarda eventos de transação já assinados.
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 34px 1fr 34px 1fr', columnGap: 10, alignItems: 'stretch' }}>
          {bitcoinTxExamples.map((tx, index) => (
            <React.Fragment key={tx.title}>
              <div
                style={{
                  border: '3px solid #FFFFFF',
                  borderRadius: 8,
                  padding: 14,
                  display: 'grid',
                  gridTemplateRows: 'auto auto 1fr auto',
                  rowGap: 9,
                  boxShadow: '0 14px 30px rgba(0,0,0,0.34)'
                }}
              >
                <div style={{ color: '#FF6B3A', fontSize: 17, fontWeight: 950 }}>Evento {index + 1}</div>
                <div style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 950, lineHeight: 1.08 }}>
                  {tx.from} → {tx.to}
                </div>
                <div style={{ display: 'grid', rowGap: 7 }}>
                  <div style={{ borderLeft: '5px solid #38BDF8', paddingLeft: 8 }}>
                    <div style={{ color: '#38BDF8', fontSize: 14, fontWeight: 950 }}>Entrada</div>
                    <div style={{ color: '#FFFFFF', fontSize: 14, fontWeight: 850 }}>{tx.fromAddress}</div>
                  </div>
                  <div style={{ borderLeft: '5px solid #00E676', paddingLeft: 8 }}>
                    <div style={{ color: '#00E676', fontSize: 14, fontWeight: 950 }}>Saída</div>
                    <div style={{ color: '#FFFFFF', fontSize: 14, fontWeight: 850 }}>{tx.toAddress}</div>
                  </div>
                  <div style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 900 }}>{tx.amount}</div>
                </div>
                <div style={{ background: '#FFD600', color: '#020817', borderRadius: 8, padding: '8px 10px', fontSize: 14, fontWeight: 950, lineHeight: 1.12 }}>
                  Assinatura: {tx.key}
                </div>
              </div>
              {index < bitcoinTxExamples.length - 1 && (
                <div style={{ color: '#FFFFFF', fontSize: 30, fontWeight: 950, alignSelf: 'center', textAlign: 'center' }}>→</div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', columnGap: 14, alignItems: 'stretch' }}>
          <div style={{ border: '3px solid #00E676', borderRadius: 8, padding: '11px 14px' }}>
            <div style={{ color: '#00E676', fontSize: 18, fontWeight: 950, marginBottom: 4 }}>Estado derivado</div>
            <div style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 850, lineHeight: 1.15 }}>
              Para saber quem pode gastar, os nós percorrem o histórico e identificam saídas não gastas.
            </div>
          </div>
          <div style={{ border: '3px solid #FFD600', borderRadius: 8, background: '#FFD600', color: '#020817', padding: '11px 14px' }}>
            <div style={{ fontSize: 18, fontWeight: 950, marginBottom: 4 }}>Regra prática</div>
            <div style={{ fontSize: 16, fontWeight: 900, lineHeight: 1.15 }}>
              O usuário envia de um endereço para outro; a chave privada só assina a autorização.
            </div>
          </div>
        </div>
      </div>
    </FlexBox>
  </Slide>
);

const EthereumBlockExamplesSlide = () => (
  <Slide backgroundColor="paper" style={{ background: theme.colors.paper, color: theme.colors.ink }}>
    <FlexBox height="100%" flexDirection="column" alignItems="stretch" justifyContent="flex-start" padding="24px 54px">
      <Kicker>Ethereum</Kicker>
      <Heading color="ink" fontSize="38px" lineHeight={1.04} margin="0 0 8px">
        Blocos, transações e contas
      </Heading>
      <Text color="white" fontSize="19px" fontWeight={850} lineHeight={1.14} margin="0 0 12px">
        No Ethereum, blocos registram transações que podem transferir valor, enviar dados, criar contratos ou executar programas.
      </Text>

      <div
        style={{
          height: 334,
          flex: '0 0 334px',
          border: '3px solid #FFFFFF',
          borderRadius: 8,
          background: '#020817',
          padding: 14,
          display: 'grid',
          gridTemplateColumns: '1.05fr 42px 1fr',
          columnGap: 16,
          alignItems: 'stretch'
        }}
      >
        <div style={{ border: '3px solid #38BDF8', borderRadius: 8, padding: 14, display: 'grid', gridTemplateRows: 'auto 1fr', rowGap: 10 }}>
          <div>
            <div style={{ color: '#38BDF8', fontSize: 22, fontWeight: 950, marginBottom: 4 }}>Bloco Ethereum</div>
            <div style={{ color: '#FFFFFF', fontSize: 15, fontWeight: 850, lineHeight: 1.12 }}>
              Um bloco agrupa transações ordenadas e aponta para o novo estado global.
            </div>
          </div>
          <div style={{ display: 'grid', rowGap: 8 }}>
            {[
              ['TX 1', 'Transferir ETH', 'EOA → EOA'],
              ['TX 2', 'Chamar contrato', 'dados/calldata + gas'],
              ['TX 3', 'Criar contrato', 'bytecode publicado']
            ].map(([tag, title, detail]) => (
              <div key={tag} style={{ border: '3px solid #FFFFFF', borderRadius: 8, padding: '8px 10px', display: 'grid', gridTemplateColumns: '66px 1fr', columnGap: 9, alignItems: 'center' }}>
                <div style={{ background: '#38BDF8', color: '#020817', borderRadius: 8, padding: '7px 6px', fontSize: 14, fontWeight: 950, textAlign: 'center' }}>{tag}</div>
                <div>
                  <div style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 950 }}>{title}</div>
                  <div style={{ color: '#FFFFFF', fontSize: 13, fontWeight: 800, opacity: 0.95 }}>{detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateRows: '1fr auto 1fr', alignItems: 'center', justifyItems: 'center' }}>
          <div style={{ color: '#FFFFFF', fontSize: 40, fontWeight: 950 }}>→</div>
          <div style={{ border: '3px solid #FFFFFF', borderRadius: 8, background: '#FFFFFF', color: '#020817', padding: '10px 8px', fontSize: 15, fontWeight: 950, lineHeight: 1.1, textAlign: 'center' }}>
            EVM executa
          </div>
          <div style={{ color: '#FFFFFF', fontSize: 40, fontWeight: 950 }}>→</div>
        </div>

        <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', rowGap: 14 }}>
          <div style={{ border: '3px solid #00E676', borderRadius: 8, padding: 12 }}>
            <div style={{ color: '#00E676', fontSize: 21, fontWeight: 950, marginBottom: 6 }}>Contas externas</div>
            <div style={{ color: '#FFFFFF', fontSize: 14, fontWeight: 850, lineHeight: 1.14, marginBottom: 8 }}>
              Controladas por chave privada. Podem iniciar transações.
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {['Alice', 'Bruno', 'Carla'].map((label) => (
                <div key={label} style={{ ...chainBlockStyle('#00E676', 70), height: 42, fontSize: 13 }}>{label}</div>
              ))}
            </div>
          </div>

          <div style={{ border: '3px solid #FFD600', borderRadius: 8, padding: 12 }}>
            <div style={{ color: '#FFD600', fontSize: 21, fontWeight: 950, marginBottom: 6 }}>Contas de contrato</div>
            <div style={{ color: '#FFFFFF', fontSize: 14, fontWeight: 850, lineHeight: 1.14, marginBottom: 8 }}>
              Têm endereço, código e armazenamento. Executam quando chamadas.
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {['DEX', 'NFT', 'DAO'].map((label) => (
                <div key={label} style={{ ...chainBlockStyle('#FFD600', 70), height: 42, fontSize: 13 }}>{label}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </FlexBox>
  </Slide>
);

const ClosingSlide = () => (
  <Slide backgroundColor="navy">
    <FlexBox height="100%" flexDirection="column" alignItems="center" justifyContent="center" padding="0 90px">
      <Kicker>Encerramento</Kicker>
      <Heading color="primary" fontSize="64px" lineHeight={1.08} textAlign="center" margin="0 0 18px">
        Obrigado
      </Heading>
      <Text color="white" fontSize="28px" fontWeight={800} lineHeight={1.25} textAlign="center" margin="0">
        Blockchain como sistema distribuído: consenso, criptografia, Bitcoin e Ethereum.
      </Text>
    </FlexBox>
  </Slide>
);

const Presentation = () => (
  <>
    <GlobalStyles />
    <Deck theme={theme} template={() => <SlideTemplate />}>
      <TitleSlide />
      {chapter1Topics.slice(0, 2).map((topic, index) => (
        <TopicSlide key={`${topic.chapter}-${topic.title}-${index}`} {...topic} />
      ))}
      {chapter1Topics.slice(2, 4).map((topic, index) => (
        <TopicSlide key={`${topic.chapter}-${topic.title}-${index}`} {...topic} />
      ))}
      <ChapterSlide
        chapter="Estrutura de Dados"
        title="A Estrutura"
        subtitle="Visualizando a Blockchain como uma Estrutura de Dados"
      />
      <ImageTopicSlide />
      <AnimatedBlockchainSlide />
      {structureHashTopics.map((topic, index) => (
        <TopicSlide key={`${topic.chapter}-${topic.title}-${index}`} {...topic} />
      ))}
      {chapter1Topics.slice(4).map((topic, index) => (
        <TopicSlide key={`${topic.chapter}-${topic.title}-${index}`} {...topic} />
      ))}
      <ChapterSlide chapter="Rede Descentralizada" title="A Rede" subtitle="visualizando a comunicação descentralizada" />
      <NodeCommunicationSlide />
      {chapter2Topics.slice(0, 1).map((topic, index) => (
        <TopicSlide key={`${topic.chapter}-${topic.title}-${index}`} {...topic} />
      ))}
      <DecentralizedImageSlide />
      <TopicSlide {...peerToPeerTopic} chapter="Rede" />
      {chapter2Topics.slice(1).map((topic, index) => (
        <TopicSlide key={`${topic.chapter}-${topic.title}-${index}`} {...topic} />
      ))}
      <ChapterSlide
        chapter="Consenso"
        title="O Consenso"
        subtitle="Como a rede valida, incentiva e coordena participantes para decidir qual estado deve ser aceito."
      />
      {consensusTopics.map((topic, index) => (
        <React.Fragment key={`${topic.chapter}-${topic.title}-${index}`}>
          <TopicSlide {...topic} />
          {topic.title === 'Proof of Work' && <ProofOfWorkMiningSlide />}
          {topic.title === 'Proof of Stake' && <ProofOfStakeValidationSlide />}
          {topic.title === 'Trade-offs de consenso' && <BlockchainTypesSlide />}
          {topic.title === 'Trade-offs de consenso' && <TokenTypesSlide />}
          {topic.title === 'Trade-offs de consenso' && <LayerTypesSlide />}
          {topic.title === 'Trade-offs de consenso' && <Layer2VsLayer1AnimationSlide />}
          {topic.title === 'Trade-offs de consenso' && <SidechainVsLayer1AnimationSlide />}
        </React.Fragment>
      ))}
      <ChapterSlide
        chapter="Criptografia"
        title="Definindo as Regras do Jogo"
        subtitle="Nesta seção, vamos tratar de como a criptografia ajuda a resolver o problema da segurança em um sistema descentralizado."
      />
      {cryptoTopics.map((topic, index) => (
        <TopicSlide key={`${topic.chapter}-${topic.title}-${index}`} {...topic} />
      ))}
      <ChapterSlide chapter="A PIONEIRA" title="Bitcoin" subtitle="Entendendo o que o Bitcoin tem a oferecer" />
      <ConceitosGeraisSlide />
      <BitcoinTransactionKeysSlide />
      {bitcoinTopics.map((topic, index) => (
        <TopicSlide key={`${topic.chapter}-${topic.title}-${index}`} {...topic} />
      ))}
      <ChapterSlide chapter="Computação Descentralizada" title="Smart Contracts" subtitle="E se, além de registrar transações, a blockchain pudesse executar programas?" />
      {smartContractTopics.map((topic, index) => (
        <React.Fragment key={`${topic.chapter}-${topic.title}-${index}`}>
          <TopicSlide {...topic} />
          {topic.title === 'DApps' && <OracleProblemSlide />}
        </React.Fragment>
      ))}
      <ChapterSlide chapter="A Evolução" title="Ethereum" subtitle="Entendendo o que o Ethereum tem a oferecer além do Bitcoin." />
      <TopicSlide {...bitcoinEthereumTopic} />
      {ethereumTopics.map((topic, index) => (
        <React.Fragment key={`${topic.chapter}-${topic.title}-${index}`}>
          <TopicSlide {...topic} />
          {topic.title === 'Conceitos Gerais' && <EthereumBlockExamplesSlide />}
        </React.Fragment>
      ))}
      <ClosingSlide />
    </Deck>
  </>
);

createRoot(document.getElementById('app')!).render(<Presentation />);
