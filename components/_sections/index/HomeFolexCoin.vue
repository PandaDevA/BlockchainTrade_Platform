<template>
  <div class="section-r fact-sheet aos-init aos-animate" id="fact-sec">
    <div class="wrap">
      <div id="token-meta">
        <p>Token Name: Folexcoin</p>
        <p>Short Name: FLX</p>
        <p>Platform: Waves</p>
        <p>Waves-ID: C8da4DbsXPcBqqGK8indGFNJFhhv3K25r4JjnXmFTW3Z</p>
        <p>Token Type: Security Smart Contract</p>
        <img
          data-aos="flip-up"
          data-aos-duration="2000"
          src="/images/FLX-ST.png"
          alt="FLX-ST"
          class="aos-init"
        >
      </div>
      <h4>Why to buy FLX Security Token?</h4>
      <h3>100% Profit Shares</h3>
      <p>100% of generated trading fees will be rewarded back to all Shareholders in the form of coins in which volume has been generated</p>
      <ul>
        <li>Unique crypto distribution model</li>
        <li>Gamble with FLX</li>
        <li>Pay half of Fees with FLX</li>
        <li>Earn passive income - just multiply your coins</li>
        <li>Prevent Crime &amp; Money Laundering</li>
        <li>
          <ul>
            <li>To transfer FLX on Blockchain approved KYC/AML is required</li>
          </ul>
        </li>
      </ul>
      <p>Be a shareholder of a unique Crypto Exchange and participate on its success!</p>
      <table>
        <tbody>
          <tr>
            <td>FLX Supply:</td>
            <td>75.000.000</td>
          </tr>
          <tr>
            <td>Token For Sale:</td>
            <td>50%</td>
          </tr>
          <tr>
            <td>Early Investor Program (SAFT):</td>
            <td>$ 0,06</td>
          </tr>
          <tr>
            <td>SAFT min. Investment SAFT:</td>
            <td>$ 1.000</td>
          </tr>
          <tr>
            <td>Initial Exchange Offering Price / Token:</td>
            <td>$ 0,10</td>
          </tr>
          <tr>
            <td>Accepting Currency For SAFT</td>
            <td>BTC, ETH, TUSD</td>
          </tr>
          <tr>
            <td>Hard Cap:</td>
            <td>$ 3.600.000</td>
          </tr>
          <tr>
            <td>SAFT-Sale completed:</td>
            <td>$ 50.000</td>
          </tr>
        </tbody>
      </table>

      <table id="chart-tbl-imgs">
        <tbody>
          <tr>
            <td>
              <img
                data-aos="fade-left"
                data-aos-duration="1000"
                src="/images/distribution.JPG"
                alt="distribution"
                class="aos-init"
              >
            </td>
            <td>
              <img
                data-aos="fade-right"
                data-aos-duration="1000"
                src="/images/intended-token.JPG"
                alt="intended-token"
                class="aos-init"
              >
            </td>
          </tr>
        </tbody>
      </table>

      <div class="fs-sec">
        <h4>SAFT Program:</h4>
        <p>The SAFT (Simple Agreement for Future Tokens) will be distributed with a discount of 40%.</p>
      </div>
      <div @click="$router.push('folex-coin')" class="fs-sec pointer">
        <h4>STO Program:</h4>
        <p>Will start with Exchange launch at March 15th, 2019 and will be sold over the Orderbook.</p>
        <p class="underline-hover blue-link">More info ></p>
      </div>
      <img
        data-aos="fade-down"
        data-aos-duration="1000"
        src="/images/point-system.JPG"
        alt="point system"
        class="chart-img aos-init"
      >
      <div class="fs-sec">
        <h4>Why Security? - The Reward-System:</h4>
        <p>There will be 4 leagues with 100 user each in which the best traders, gamblers and shareholders can compete.*</p>
        <p>A points system (see below) will be used to determine who can hold their own against their fellow players and can thus be crowned "Champion of Flex".</p>
        <p>Within the leagues it is possible to ascend and descend.</p>
      </div>
      <div class="fs-sec">
        <h4>Benefits for Shareholders:</h4>
        <p>Due to the 100% Reward of all Coins with generated volume, there is no need to get into one of the coveted leagues. Because it is distributed to all FLX shareholders!</p>
        <p>If you don't reach the league, you will be rewarded proportionately for your FLX!</p>
      </div>
      <div class="fs-sec">
        <h4>Offline-Staking</h4>
        <p>
          It will be possible to transfer the FLX tokens into your own wallet and still participate to the rewards system! Only register your wallet address on the exchange and continue to the rewards system! Rewards are then credited to the account
          on the exchange.
        </p>
      </div>
      <div class="fs-sec">
        <h4>When will the Reward be available?</h4>
        <p>Every Sunday at 12:00pm UTC the Reward will be distributed.
          <br>This will cause users to ascend and descend in the league and the collected points of all users will be reset. (A new season starts)
        </p>
      </div>
      <div class="fs-sec">
        <h4>Folex Gamble:</h4>
        <p>On "Folex Gamble" you can take a seat at a virtual roulette table and bet and win with FLX.</p>
      </div>
      <div @click="$router.push('folex-coin')" class="fs-sec pointer">
        <h4 class="underline-hover">How to get FLX after STO?</h4>
        <p>FLX will be freely tradeable on folex.io</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.wrap {
  display: block;
  width: 940px;
  margin-right: auto;
  margin-left: auto;
}

.fact-sheet {
  color: #000;
  text-align: left;
  padding: 0px 15px;
  font-size: 17px;
  font-family: calibri, sans-serif;
  background: #e6e6e6;
}

.fact-sheet .wrap {
  background-position: top left;
  background-size: contain;
  padding: 100px 50px 50px 50px;
  padding-left: 8%;
}

.fact-sheet #token-meta {
  margin-bottom: 50px;
}

#token-meta img {
  max-width: 180px;
  float: right;
  position: relative;
  top: -100px;
}

.fact-sheet .chart-img {
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
  display: block;
}

#chart-tbl-imgs {
  width: 100%;
}

#chart-tbl-imgs img {
  padding: 20px;
}

.fact-sheet #token-meta p {
  color: #000000;
  font-weight: bold;
}

.fact-sheet h4 {
  font-weight: 400;
  color: #4f7dc7;
}

.fact-sheet h3 {
  color: #e87028;
  font-weight: 400;
  font-size: 28px;
  margin-bottom: 25px;
}

.fact-sheet ul {
}

.fact-sheet ul li ul {
}

.fact-sheet p {
  color: #000;
  margin: 0;
}

.fact-sheet table {
  margin: 30px 0;
}

.fact-sheet table td {
  padding: 5px 15px 5px 0;
}

.fact-sheet .fs-sec {
  margin-bottom: 20px;
  display: block;
}

.fact-sheet .fs-sec h4 {
  margin-bottom: 0;
}
</style>