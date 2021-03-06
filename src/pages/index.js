import React, { useState, useContext, useEffect } from 'react';

import axios from 'axios';

import { Container } from '@material-ui/core';
import Layout from '../components/layout';
import ASAList from '../components/ASAList/ASAList.component';
import ASATransactions from '../components/ASATransactions/ASATransactions.component';
import AlgoSignerContext from '../contexts/algosigner.context';

import AlgoSdk from '../services/AlgoSdk';

const IndexPage = () => {
  const ctx = useContext(AlgoSignerContext);
  const [accountDetails, setAccountDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (ctx.currentAddress) {
      axios
        .get(
          `https://api.testnet.algoexplorer.io/idx2/v2/accounts/${ctx.currentAddress}`,
        )
        .then((res) => {
          console.log(res.data.account);
          setAccountDetails(res.data.account);
          setLoading(false);
        // res.data['created-assets'].map((item) => {
        //   console.log(item.index);
        //   console.log(item.params.name, item.params.total);
        //   axios
        //     .get(
        //       `https://api.testnet.algoexplorer.io/idx2/v2/assets/13672793/balances`
        //     )
        //     .then((res) => {
        //       console.log(res);
        //       const newBalances = res.data.balances.map((obj) => obj.address);
        //       console.log(newBalances);
        //       setAccountDetails({ balances: newBalances });
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }, [ctx]);
  return (
    <Layout>
      <title>ASA Overview</title>
      <h2>ASA Overview</h2>
      <Container>
        { accountDetails['created-assets'] ? (
          <>
            <ASAList data={accountDetails['created-assets']} loading={loading} />
            <h2>Transactions</h2>
            <ASATransactions asaList={accountDetails['created-assets']} loading={loading} />
          </>
        ) : (
          <h1>Select an account or this account has not created any ASA</h1>
        )}
      </Container>
    </Layout>
  );
};

export default IndexPage;
