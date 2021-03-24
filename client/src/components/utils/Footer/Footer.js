import React from "react";
import { Anchor, Footer as SiteFooter, Text } from "grommet";

export default function Footer() {
  return (
    <SiteFooter style={{ padding: 20 }} background="#FE646F">
      <Text color="black" style={{ fontWeight: "bold" }}>
        Copyright © 2021 Fitnova
      </Text>
      <Anchor label="Help" color="white" style={{ marginRight: 100 }} />
    </SiteFooter>
  );
}
