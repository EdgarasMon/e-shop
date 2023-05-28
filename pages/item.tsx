"use client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Item from "../src/app/components/Item";

const ItemPage: NextPage = () => {
  const router = useRouter();
  let itemId = router.query.itemId;
  !itemId ? (itemId = "item id not found") : null;
  return <Item itemId={itemId} />;
};

export default ItemPage;
