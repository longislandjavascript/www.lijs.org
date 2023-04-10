/* eslint-disable jsx-a11y/alt-text */
"use client";

import {
  Document,
  Font,
  Image,
  PDFDownloadLink,
  PDFViewer,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer/lib/react-pdf.browser.cjs.js";
import { format } from "date-fns";
import chunk from "lodash/chunk";

import { Button } from "components/Button";
import { RedemptionCode } from "utils/airtable-api";

Font.registerEmojiSource({
  format: "png",
  url: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/",
});

const lijsBlue = "#176ff3";

const SHOW_PREVIEW_BORDER = false;

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    fontFamily: "Helvetica",
    color: "#141414",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "center",
    height: "100%",
    width: "100%",
  },
  card: {
    height: "3in",
    width: "4in",
    flexShrink: 0,
    flexGrow: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px",
    border: SHOW_PREVIEW_BORDER ? "1px solid lightgray" : "none",
  },
  viewer: {
    width: "100%",
    height: "100vh",
  },
  qr: {
    height: "1.5in",
    width: "1.5in",
  },
  oreilly: {
    height: "20px",
    width: "auto",
    marginRight: "2px",
  },
  oreilly_sm: {
    height: "16px",
    width: "auto",
    marginRight: "2px",
  },
  congratulations: {
    fontFamily: "Courier-Bold",
    fontSize: "24px",
    color: lijsBlue,
    textTransform: "uppercase",
    margin: "0px 4px",
  },
  text: {
    fontSize: "14px",
  },
  smText: {
    fontSize: "12px",
  },
  xsText: {
    fontSize: "8px",
  },
  xxsText: {
    fontSize: "10px",
    paddingTop: "2px",
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  website: {
    fontSize: "11px",
    fontFamily: "Helvetica-Bold",
    marginLeft: "4px",
    color: lijsBlue,
  },
  code: {
    fontSize: "16px",
    fontFamily: "Courier-Bold",
    fontWeight: "bold",
    color: lijsBlue,
    marginLeft: "4px",
    padding: "4px 2px 0px 5px",
    border: `2px dashed lightgray`,
    borderRadius: "6px",
  },
});

export function Viewer(props: { items: RedemptionCode[] }) {
  const chunks = chunk(props.items, 6) as RedemptionCode[][];

  const MyDoc = () => (
    <Document>
      {chunks.map((chunk, index) => {
        const len = chunk.length;
        const newChunk =
          len < 6
            ? [...chunk, ...Array.from({ length: 6 - len }, () => null)]
            : chunk;
        return <PDFPage key={index} items={newChunk} />;
      })}
    </Document>
  );

  const today = format(new Date(), "MM-dd-yyyy");
  const documentTitle = `lijs-redemption-codes-${today}`;
  return (
    <>
      <PDFDownloadLink document={<MyDoc />} fileName={`${documentTitle}.pdf`}>
        {({ blob, url, loading, error }) => (
          <Button className="mb-4" loading={loading}>
            Download
          </Button>
        )}
      </PDFDownloadLink>
      <PDFViewer style={styles.viewer} showToolbar={true}>
        <Document title={documentTitle}>
          {chunks.map((chunk, index) => {
            const len = chunk.length;
            const newChunk =
              len < 6
                ? [...chunk, ...Array.from({ length: 6 - len }, () => null)]
                : chunk;
            return <PDFPage key={index} items={newChunk} />;
          })}
        </Document>
      </PDFViewer>
    </>
  );
}

type PDFPageProps = {
  items: RedemptionCode[];
};

const PDFPage = (props: PDFPageProps) => {
  return (
    <Page size="LETTER" style={styles.page}>
      {props.items.map((item, index) => {
        return <Card key={index} item={item} />;
      })}
    </Page>
  );
};

type CardProps = {
  item: RedemptionCode;
};

const Card = (props: CardProps) => {
  const { item } = props;

  if (!item) return <View style={styles.card} />;

  const PrizeText = () => {
    if (item.prize_type === "Book") {
      return (
        <View style={styles.flex}>
          <Text style={styles.text}>You won a book from </Text>
          <Image src="/sponsors/oreilly.png" style={styles.oreilly} />
        </View>
      );
    } else
      return (
        <View style={styles.flex}>
          <Text style={styles.xsText}>You won a 30-day pass to </Text>
          <Image src="/sponsors/oreilly.png" style={styles.oreilly_sm} />
          <Text style={styles.xsText}>Online Learning </Text>
        </View>
      );
  };
  return (
    <View style={styles.card}>
      <View style={styles.flex}>
        <Text style={styles.congratulations}>Congratulations</Text>
        <Text>🎉</Text>
      </View>

      <PrizeText />
      <Image src="/qr-code-redeem.png" style={styles.qr} />
      <View style={styles.flex}>
        <Text style={styles.smText}>Scan here or visit</Text>
        <Text style={styles.website}>lijs.org/redeem</Text>
      </View>
      <View style={styles.flex}>
        <Text style={styles.xxsText}>REDEMPTION CODE:</Text>
        <Text style={styles.code}>{item.code}</Text>
      </View>
    </View>
  );
};
