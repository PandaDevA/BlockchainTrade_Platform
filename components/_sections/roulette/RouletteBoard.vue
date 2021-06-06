<template>
  <div class="board d-flex">
    <roulette-wheel
      @resetBets="reset"
      :is-enough-money="isEnoughMoney"
      :total-pro="exceedTotalPro"
      :cur-bet="currentBetTxt"
      @placed="place"
      @changeCanBet="changeCanBet"
      ref="wheel"
    />
    <div class="body-board">
      <div class="d-flex w-100">
        <div class="board-balance d-flex-full-center w-100">
          <div
            id="balance"
            class="info-label"
          >FLX Balance: {{ toFixedSmall((balance - currentBet)) }} FLX</div>
        </div>
        <roulette-rules/>
      </div>
      <div class="roulette">
        <table>
          <tr class="nums">
            <td class="num green double-zero" rowspan="1">
              <span>00</span>
            </td>
            <td class="num red">
              <span>3</span>
            </td>
            <td class="num black">
              <span>6</span>
            </td>
            <td class="num red">
              <span>9</span>
            </td>
            <td class="num red">
              <span>12</span>
            </td>
            <td class="num black">
              <span>15</span>
            </td>
            <td class="num red">
              <span>18</span>
            </td>
            <td class="num red">
              <span>21</span>
            </td>
            <td class="num black">
              <span>24</span>
            </td>
            <td class="num red">
              <span>27</span>
            </td>
            <td class="num red">
              <span>30</span>
            </td>
            <td class="num black">
              <span>33</span>
            </td>
            <td class="num red">
              <span>36</span>
            </td>
            <td class="sector" data-sector="1">
              <span class="vt">2 to 1</span>
            </td>
          </tr>
          <tr class="nums">
            <!-- <td class="hidden"></td> -->
            <td class="num green zero" rowspan="2">
              <span>0</span>
            </td>
            <td class="num black">
              <span>2</span>
            </td>
            <td class="num red">
              <span>5</span>
            </td>
            <td class="num black">
              <span>8</span>
            </td>
            <td class="num black">
              <span>11</span>
            </td>
            <td class="num red">
              <span>14</span>
            </td>
            <td class="num black">
              <span>17</span>
            </td>
            <td class="num black">
              <span>20</span>
            </td>
            <td class="num red">
              <span>23</span>
            </td>
            <td class="num black">
              <span>26</span>
            </td>
            <td class="num black">
              <span>29</span>
            </td>
            <td class="num red">
              <span>32</span>
            </td>
            <td class="num black">
              <span>35</span>
            </td>
            <td class="sector" data-sector="2">
              <span class="vt">2 to 1</span>
            </td>
          </tr>
          <tr class="nums">
            <td class="hidden"></td>
            <td class="num red">
              <span>1</span>
            </td>
            <td class="num black">
              <span>4</span>
            </td>
            <td class="num red">
              <span>7</span>
            </td>
            <td class="num black">
              <span>10</span>
            </td>
            <td class="num black">
              <span>13</span>
            </td>
            <td class="num red">
              <span>16</span>
            </td>
            <td class="num red">
              <span>19</span>
            </td>
            <td class="num black">
              <span>22</span>
            </td>
            <td class="num red">
              <span>25</span>
            </td>
            <td class="num black">
              <span>28</span>
            </td>
            <td class="num black">
              <span>31</span>
            </td>
            <td class="num red">
              <span>34</span>
            </td>
            <td class="sector" data-sector="3">
              <span class="vt">2 to 1</span>
            </td>
          </tr>
          <tr>
            <td class="empty-bet"></td>
            <td colspan="4" class="sector" data-sector="4">1st 12</td>
            <td colspan="4" class="sector" data-sector="5">2nd 12</td>
            <td colspan="4" class="sector" data-sector="6">3rd 12</td>
            <td class="empty-bet"></td>
          </tr>
          <tr>
            <td class="empty-bet"></td>
            <td colspan="2" class="sector" data-sector="7">1 to 18</td>
            <td colspan="2" class="sector" data-sector="8">EVEN</td>
            <td colspan="2" class="sector red" data-sector="9">RED</td>
            <td colspan="2" class="sector black" data-sector="10">BLACK</td>
            <td colspan="2" class="sector" data-sector="11">ODD</td>
            <td colspan="2" class="sector" data-sector="12">19 to 36</td>
            <td class="empty-bet"></td>
          </tr>
        </table>
        <div class="controlls">
          <div class="btn-bet btn-double-zero" data-num="38"></div>
          <div class="btn-bet btn-zero" data-num="0"></div>
          <!-- col6 -->
          <div class="col1">
            <div class="row1">
              <div class="btn-bet v rm cv" data-num="38,3"></div>
              <div class="btn-bet m rm cm" data-num="3"></div>
            </div>
            <div class="row2">
              <div class="btn-bet c rh cv" data-num="38,2,3"></div>
              <div
                style="width: 16px; height: 34px; left: 54px;"
                class="btn-bet v rm cv"
                data-num="38,0,3,2,1"
              ></div>
              <div class="btn-bet h rh cm" data-num="2,3"></div>
              <div class="btn-bet m rm cm" data-num="2"></div>
            </div>
            <div class="row3">
              <div class="btn-bet c rh cv" data-num="0,1,2"></div>
              <div class="btn-bet v rm cv" data-num="0,1"></div>
              <div class="btn-bet c rb cv" data-num="0,1,2,3"></div>
              <div class="btn-bet h rh cm" data-num="1,2"></div>
              <div class="btn-bet m rm cm" data-num="1"></div>
              <div class="btn-bet h rb cm" data-num="1,2,3"></div>
            </div>
            <div class="row4">
              <div class="btn-bet ms4 rm cm" data-type="sector" data-sector="4"></div>
            </div>
            <div class="row5">
              <div class="btn-bet ms2 rm cm" data-type="sector" data-sector="7"></div>
            </div>
          </div>
          <!-- col2 -->
          <div class="col2">
            <div class="row1">
              <div class="btn-bet v rm cv" data-num="3,6"></div>
              <div class="btn-bet m rm cm" data-num="6"></div>
            </div>
            <div class="row2">
              <div class="btn-bet c rh cv" data-num="2,3,5,6"></div>
              <div class="btn-bet v rm cv" data-num="2,5"></div>
              <div class="btn-bet h rh cm" data-num="5,6"></div>
              <div class="btn-bet m rm cm" data-num="5"></div>
            </div>
            <div class="row3">
              <div class="btn-bet c rh cv" data-num="1,2,4,5"></div>
              <div class="btn-bet v rm cv" data-num="1,4"></div>
              <div class="btn-bet c rb cv" data-num="1,2,3,4,5,6"></div>
              <div class="btn-bet h rh cm" data-num="4,5"></div>
              <div class="btn-bet m rm cm" data-num="4"></div>
              <div class="btn-bet h rb cm" data-num="4,5,6"></div>
            </div>
          </div>
          <!-- col3 -->
          <div class="col3">
            <div class="row1">
              <div class="btn-bet v rm cv" data-num="6,9"></div>
              <div class="btn-bet m rm cm" data-num="9"></div>
            </div>
            <div class="row2">
              <div class="btn-bet c rh cv" data-num="5,6,8,9"></div>
              <div class="btn-bet v rm cv" data-num="5,8"></div>
              <div class="btn-bet h rh cm" data-num="8,9"></div>
              <div class="btn-bet m rm cm" data-num="8"></div>
            </div>
            <div class="row3">
              <div class="btn-bet c rh cv" data-num="4,5,7,8"></div>
              <div class="btn-bet v rm cv" data-num="4,7"></div>
              <div class="btn-bet c rb cv" data-num="4,5,6,7,8,9"></div>
              <div class="btn-bet h rh cm" data-num="7,8"></div>
              <div class="btn-bet m rm cm" data-num="7"></div>
              <div class="btn-bet h rb cm" data-num="7,8,9"></div>
            </div>
            <div class="row5">
              <div class="btn-bet ms2 rm cm" data-type="sector" data-sector="8"></div>
            </div>
          </div>
          <!-- col4 -->
          <div class="col4">
            <div class="row1">
              <div class="btn-bet v rm cv" data-num="9,12"></div>
              <div class="btn-bet m rm cm" data-num="12"></div>
            </div>
            <div class="row2">
              <div class="btn-bet c rh cv" data-num="8,9,11,12"></div>
              <div class="btn-bet v rm cv" data-num="8,11"></div>
              <div class="btn-bet h rh cm" data-num="11,12"></div>
              <div class="btn-bet m rm cm" data-num="11"></div>
            </div>
            <div class="row3">
              <div class="btn-bet c rh cv" data-num="7,8,10,11"></div>
              <div class="btn-bet v rm cv" data-num="7,10"></div>
              <div class="btn-bet c rb cv" data-num="7,8,9,10,11,12"></div>
              <div class="btn-bet h rh cm" data-num="10,11"></div>
              <div class="btn-bet m rm cm" data-num="10"></div>
              <div class="btn-bet h rb cm" data-num="10,11,12"></div>
            </div>
          </div>
          <!-- col5 -->
          <div class="col5">
            <div class="row1">
              <div class="btn-bet v rm cv" data-num="12,15"></div>
              <div class="btn-bet m rm cm" data-num="15"></div>
            </div>
            <div class="row2">
              <div class="btn-bet c rh cv" data-num="11,12,14,15"></div>
              <div class="btn-bet v rm cv" data-num="11,14"></div>
              <div class="btn-bet h rh cm" data-num="14,15"></div>
              <div class="btn-bet m rm cm" data-num="14"></div>
            </div>
            <div class="row3">
              <div class="btn-bet c rh cv" data-num="10,11,13,14"></div>
              <div class="btn-bet v rm cv" data-num="10,13"></div>
              <div class="btn-bet c rb cv" data-num="10,11,12,13,14,15"></div>
              <div class="btn-bet h rh cm" data-num="13,14"></div>
              <div class="btn-bet m rm cm" data-num="13"></div>
              <div class="btn-bet h rb cm" data-num="13,14,15"></div>
            </div>
            <div class="row4">
              <div class="btn-bet ms4 rm cm" data-type="sector" data-sector="5"></div>
            </div>
            <div class="row5">
              <div class="btn-bet ms2 rm cm" data-type="sector" data-sector="9"></div>
            </div>
          </div>
          <!-- col6 -->
          <div class="col6">
            <div class="row1">
              <div class="btn-bet v rm cv" data-num="15,18"></div>
              <div class="btn-bet m rm cm" data-num="18"></div>
            </div>
            <div class="row2">
              <div class="btn-bet c rh cv" data-num="14,15,17,18"></div>
              <div class="btn-bet v rm cv" data-num="14,17"></div>
              <div class="btn-bet h rh cm" data-num="17,18"></div>
              <div class="btn-bet m rm cm" data-num="17"></div>
            </div>
            <div class="row3">
              <div class="btn-bet c rh cv" data-num="13,14,16,17"></div>
              <div class="btn-bet v rm cv" data-num="13,16"></div>
              <div class="btn-bet c rb cv" data-num="13,14,15,16,17,18"></div>
              <div class="btn-bet h rh cm" data-num="16,17"></div>
              <div class="btn-bet m rm cm" data-num="16"></div>
              <div class="btn-bet h rb cm" data-num="16,17,18"></div>
            </div>
          </div>
          <!-- col7 -->
          <div class="col7">
            <div class="row1">
              <div class="btn-bet v rm cv" data-num="18,21"></div>
              <div class="btn-bet m rm cm" data-num="21"></div>
            </div>
            <div class="row2">
              <div class="btn-bet c rh cv" data-num="17,18,20,21"></div>
              <div class="btn-bet v rm cv" data-num="17,20"></div>
              <div class="btn-bet h rh cm" data-num="20,21"></div>
              <div class="btn-bet m rm cm" data-num="20"></div>
            </div>
            <div class="row3">
              <div class="btn-bet c rh cv" data-num="16,17,19,20"></div>
              <div class="btn-bet v rm cv" data-num="16,19"></div>
              <div class="btn-bet c rb cv" data-num="16,17,18,19,20,21"></div>
              <div class="btn-bet h rh cm" data-num="19,20"></div>
              <div class="btn-bet m rm cm" data-num="19"></div>
              <div class="btn-bet h rb cm" data-num="19,20,21"></div>
            </div>
            <div class="row5">
              <div class="btn-bet ms2 rm cm" data-type="sector" data-sector="10"></div>
            </div>
          </div>
          <!-- col8 -->
          <div class="col8">
            <div class="row1">
              <div class="btn-bet v rm cv" data-num="21,24"></div>
              <div class="btn-bet m rm cm" data-num="24"></div>
            </div>
            <div class="row2">
              <div class="btn-bet c rh cv" data-num="20,21,23,24"></div>
              <div class="btn-bet v rm cv" data-num="20,23"></div>
              <div class="btn-bet h rh cm" data-num="23,24"></div>
              <div class="btn-bet m rm cm" data-num="23"></div>
            </div>
            <div class="row3">
              <div class="btn-bet c rh cv" data-num="19,20,22,23"></div>
              <div class="btn-bet v rm cv" data-num="19,22"></div>
              <div class="btn-bet c rb cv" data-num="19,20,21,22,23,24"></div>
              <div class="btn-bet h rh cm" data-num="22,23"></div>
              <div class="btn-bet m rm cm" data-num="22"></div>
              <div class="btn-bet h rb cm" data-num="22,23,24"></div>
            </div>
          </div>
          <!-- col9 -->
          <div class="col9">
            <div class="row1">
              <div class="btn-bet v rm cv" data-num="24,27"></div>
              <div class="btn-bet m rm cm" data-num="27"></div>
            </div>
            <div class="row2">
              <div class="btn-bet c rh cv" data-num="23,24,26,27"></div>
              <div class="btn-bet v rm cv" data-num="23,26"></div>
              <div class="btn-bet h rh cm" data-num="26,27"></div>
              <div class="btn-bet m rm cm" data-num="26"></div>
            </div>
            <div class="row3">
              <div class="btn-bet c rh cv" data-num="22,23,25,26"></div>
              <div class="btn-bet v rm cv" data-num="22,25"></div>
              <div class="btn-bet c rb cv" data-num="22,23,24,25,26,27"></div>
              <div class="btn-bet h rh cm" data-num="25,26"></div>
              <div class="btn-bet m rm cm" data-num="25"></div>
              <div class="btn-bet h rb cm" data-num="25,26,27"></div>
            </div>
            <div class="row4">
              <div class="btn-bet ms4 rm cm" data-type="sector" data-sector="6"></div>
            </div>
            <div class="row5">
              <div class="btn-bet ms2 rm cm" data-type="sector" data-sector="11"></div>
            </div>
          </div>
          <!-- col10 -->
          <div class="col10">
            <div class="row1">
              <div class="btn-bet v rm cv" data-num="27,30"></div>
              <div class="btn-bet m rm cm" data-num="30"></div>
            </div>
            <div class="row2">
              <div class="btn-bet c rh cv" data-num="26,27,29,30"></div>
              <div class="btn-bet v rm cv" data-num="26,29"></div>
              <div class="btn-bet h rh cm" data-num="29,30"></div>
              <div class="btn-bet m rm cm" data-num="29"></div>
            </div>
            <div class="row3">
              <div class="btn-bet c rh cv" data-num="25,26,28,29"></div>
              <div class="btn-bet v rm cv" data-num="25,28"></div>
              <div class="btn-bet c rb cv" data-num="25,26,27,28,29,30"></div>
              <div class="btn-bet h rh cm" data-num="28,29"></div>
              <div class="btn-bet m rm cm" data-num="28"></div>
              <div class="btn-bet h rb cm" data-num="28,29,30"></div>
            </div>
          </div>
          <!-- col11 -->
          <div class="col11">
            <div class="row1">
              <div class="btn-bet v rm cv" data-num="30,33"></div>
              <div class="btn-bet m rm cm" data-num="33"></div>
            </div>
            <div class="row2">
              <div class="btn-bet c rh cv" data-num="29,30,32,33"></div>
              <div class="btn-bet v rm cv" data-num="29,32"></div>
              <div class="btn-bet h rh cm" data-num="32,33"></div>
              <div class="btn-bet m rm cm" data-num="32"></div>
            </div>
            <div class="row3">
              <div class="btn-bet c rh cv" data-num="28,29,31,32"></div>
              <div class="btn-bet v rm cv" data-num="28,31"></div>
              <div class="btn-bet c rb cv" data-num="28,29,30,31,32,33"></div>
              <div class="btn-bet h rh cm" data-num="31,32"></div>
              <div class="btn-bet m rm cm" data-num="31"></div>
              <div class="btn-bet h rb cm" data-num="31,32,33"></div>
            </div>
            <div class="row5">
              <div class="btn-bet ms2 rm cm" data-type="sector" data-sector="12"></div>
            </div>
          </div>
          <!-- col12 -->
          <div class="col12">
            <div class="row1">
              <div class="btn-bet v rm cv" data-num="33,36"></div>
              <div class="btn-bet m rm cm" data-num="36"></div>
            </div>
            <div class="row2">
              <div class="btn-bet c rh cv" data-num="32,33,35,36"></div>
              <div class="btn-bet v rm cv" data-num="32,35"></div>
              <div class="btn-bet h rh cm" data-num="35,36"></div>
              <div class="btn-bet m rm cm" data-num="35"></div>
            </div>
            <div class="row3">
              <div class="btn-bet c rh cv" data-num="31,32,34,35"></div>
              <div class="btn-bet v rm cv" data-num="31,34"></div>
              <div class="btn-bet c rb cv" data-num="31,32,33,34,35,36"></div>
              <div class="btn-bet h rh cm" data-num="34,35"></div>
              <div class="btn-bet m rm cm" data-num="34"></div>
              <div class="btn-bet h rb cm" data-num="34,35,36"></div>
            </div>
          </div>
          <!-- col13 -->
          <div class="col13">
            <div class="row1">
              <div class="btn-bet m rm cm" data-type="sector" data-sector="1"></div>
            </div>
            <div class="row2">
              <div class="btn-bet m rm cm" data-type="sector" data-sector="2"></div>
            </div>
            <div class="row3">
              <div class="btn-bet m rm cm" data-type="sector" data-sector="3"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="board-info d-flex justify-around">
        <div id="current-bet" class="d-flex flex-column">
          <h4 class="text-white m-none">Bet (FLX):</h4>
          <div class="d-flex-full-center">
            <number-input
              v-model.number="currentBet"
              :min="0"
              :max="maxBet"
              :step="1"
              :disabled="!chips.length || !canBet"
              size="small"
              center
              inline
              controls
              class="m-none p-none custom-number-input"
            ></number-input>
            <button @click="reset" class="ml-4 btn bg-red py-1 stoploss">Reset</button>
          </div>
          <span class="info-label pt-1 m-none">
            Current bet:
            <span class="text-black">{{ currentBetName }}</span>
          </span>
        </div>
        <div id="possible-win" class="d-flex justify-content-start align-items-center flex-column">
          <h4 class="text-white m-none">Possible Win:</h4>
          <div class="info-label mt-2">
            <span class="text-green">{{ toFixedSmall(possibleWin + currentBet, 6)}}</span> FLX
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RouletteWheel from "@/components/_sections/roulette/RouletteWheel";
import RouletteRules from "@/components/_sections/roulette/RouletteRules";
import NumberInput from "@/components/external/VueNumberInput";
import { clone, filter, get, isEmpty, map } from "lodash";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    RouletteWheel,
    RouletteRules,
    NumberInput
  },
  data() {
    return {
      bets: [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      sectormultipliers: [
        [
          0,
          0,
          0,
          2,
          0,
          0,
          2,
          0,
          0,
          2,
          0,
          0,
          2,
          0,
          0,
          2,
          0,
          0,
          2,
          0,
          0,
          2,
          0,
          0,
          2,
          0,
          0,
          2,
          0,
          0,
          2,
          0,
          0,
          2,
          0,
          0,
          2
        ], //3rd column
        [
          0,
          0,
          2,
          0,
          0,
          2,
          0,
          0,
          2,
          0,
          0,
          2,
          0,
          0,
          2,
          0,
          0,
          2,
          0,
          0,
          2,
          0,
          0,
          2,
          0,
          0,
          2,
          0,
          0,
          2,
          0,
          0,
          2,
          0,
          0,
          2,
          0
        ], //2nd column
        [
          0,
          2,
          0,
          0,
          2,
          0,
          0,
          2,
          0,
          0,
          2,
          0,
          0,
          2,
          0,
          0,
          2,
          0,
          0,
          2,
          0,
          0,
          2,
          0,
          0,
          2,
          0,
          0,
          2,
          0,
          0,
          2,
          0,
          0,
          2,
          0,
          0
        ], //1st column
        [
          0,
          2,
          2,
          2,
          2,
          2,
          2,
          2,
          2,
          2,
          2,
          2,
          2,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ], //1st 12
        [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          2,
          2,
          2,
          2,
          2,
          2,
          2,
          2,
          2,
          2,
          2,
          2,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ], //2nd 12
        [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          2,
          2,
          2,
          2,
          2,
          2,
          2,
          2,
          2,
          2,
          2,
          2
        ], //3rd 12
        [
          0,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ], //1 to 18
        [
          0,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1
        ], //even
        [
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1
        ], //Red
        [
          0,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0
        ], //Black
        [
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0
        ], //odd
        [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1
        ] //19 to 36
      ],
      sectors: [
        "3rd column",
        "2nd column",
        "1st column",
        "1st 12",
        "2nd 12",
        "3rd 12",
        "1 to 18",
        "Even",
        "Red",
        "Black",
        "Odd",
        "19 to 36"
      ],
      selectors: {
        roulette: ".roulette",
        num: ".num",
        sector: ".sector",
        table_btns: ".controlls .btn-bet"
      },
      classes: {
        red: "red",
        black: "black",
        green: "green",
        hover: "hover"
      },
      numbers: {
        red: [],
        black: [],
        green: []
      },
      sectorsId: {
        "1": [], // 1st row
        "2": [], // 2nd row
        "3": [], // 3rd row
        "4": [], // 1st 12
        "5": [], // 2nd 12
        "6": [], // 3rd 12
        "7": [], // 1 to 18
        "8": [], // EVEN
        "9": [], // RED
        "10": [], // BLACK
        "11": [], // ODD
        "12": [] // 19 to 36
      },
      balance: 0,
      currentTier: 0,
      currentBetName: "",
      totalPro: 0,             // Added by Maksim
      currentBet: 0,
      squares: new Array(49),
      chips: [],
      possibleWin: 0,
      isChipAdded: false,
      canBet: true
    };
  },
  mounted() {
    const that = this;
    let hovering = 0;
    (function($) {
      // table
      (function() {
        "use strict";
        function getButtonCells(btn) {
          let cells = btn.data("cells"),
            nums;
          if (!cells || !cells.length) {
            cells = [];
            switch (btn.data("type")) {
              case "sector":
                nums = that.sectorsId[btn.data("sector")];
                for (let i = 0, len = nums.length; i < len; i++) {
                  cells.push(table_nums[nums[i]]);
                }
                return cells;
                break;
              case "num":
              default:
                nums = String(btn.data("num")).split(",");
                for (let i = 0, len = nums.length; i < len; i++) {
                  cells.push(table_nums[nums[i]]);
                }
                btn.data("cells", cells);
                return btn.data("cells");
                break;
            }
          }
          return cells;
        }

        // props
        var active = true,
          table_nums = {},
          table_sectors = {};

        // init
        $(that.selectors.num).each(function() {
          var $this = $(this),
            color,
            num = $this.text() === "00" ? 38 : Number($this.text());
          // add to instances array
          table_nums[num] = $this;
          // add to colors array
          for (var color in that.numbers) {
            if ($this.hasClass(that.classes[color])) {
              that.numbers[color].push(num);
              $this.data("color", color);
            }
          }
        });

        $(that.selectors.sector).each(function() {
          var $this = $(this),
            color;
          if ($this.hasClass(that.classes.red)) {
            color = "red";
          } else if ($this.hasClass(that.classes.black)) {
            color = "black";
          } else {
            color = "sector";
          }
          $this.data("color", color);
          table_sectors[$this.data("sector")] = $this;
        });

        // sort numbers
        for (var color in that.numbers) {
          that.numbers[color].sort(function(a, b) {
            return a - b;
          });
        }

        // populate sectors
        for (var i = 1; i <= 36; i++) {
          // 1st row, 2nd row, 3rd row
          switch (i % 3) {
            case 0:
              that.sectorsId["1"].push(i);
              break;
            case 1:
              that.sectorsId["3"].push(i);
              break;
            case 2:
              that.sectorsId["2"].push(i);
              break;
          }

          // 1st 12, 2nd 12, 3rd 12
          if (i <= 12) {
            that.sectorsId["4"].push(i);
          } else if (i <= 24) {
            that.sectorsId["5"].push(i);
          } else {
            that.sectorsId["6"].push(i);
          }

          // 1 to 18, 19 to 36
          if (i <= 18) {
            that.sectorsId["7"].push(i);
          } else {
            that.sectorsId["12"].push(i);
          }

          // ODD, EVEN
          if (i % 2) {
            that.sectorsId["11"].push(i);
          } else {
            that.sectorsId["8"].push(i);
          }

          if (that.numbers.red.indexOf(i) != -1) {
            that.sectorsId["9"].push(i);
          } else if (that.numbers.black.indexOf(i) != -1) {
            that.sectorsId["10"].push(i);
          }
        }

        // buttons
        const table_btns = $(that.selectors.table_btns)
          .hover(
            function() {
              hovering = 1;
              if (active) {
                const $this = $(this),
                  cells = getButtonCells($this);
                for (let i = 0, len = cells.length; i < len; i++) {
                  cells[i].addClass(that.classes.hover);
                }
                const sector = $this.data("sector");
                if (sector) {
                  table_sectors[sector].addClass(that.classes.hover);
                }
              }
            },
            function() {
              hovering = 0;
              const $this = $(this),
                cells = getButtonCells($this);
              for (let i = 0, len = cells.length; i < len; i++) {
                cells[i].removeClass(that.classes.hover);
              }
              const sector = $this.data("sector");
              if (sector) {
                table_sectors[sector].removeClass(that.classes.hover);
              }
            }
          )
          .mousedown(function(e) {
            let numbers = [];
            if (typeof $(this).data("sector") != "undefined") {
              const sectorsString = 38 + $(this).data("sector");

              if (e.button == 2) {
                that.toggleChipAdded(false);
                that.changeBet(sectorsString, -1, sectorsString);
                that.reset();
              } else {
                that.changeBet(sectorsString, +1, sectorsString, true);
                that.toggleChipAdded(true);
              }
            } else {
              numbers = $(this).data("num");
              const numbersString = numbers;

              if (typeof numbers.length === "undefined") numbers = [numbers];
              else numbers = numbers.split(",");

              if (e.button == 2) {
                that.toggleChipAdded(false);
                for (let i = 0; i < that.bets.length; i++) {
                  that.reset();
                  that.changeBet(i, -1, numbersString);
                }
              } else {
                for (let i = 0; i < numbers.length; i++) {
                  that.changeBet(numbers[i], +1, numbersString, i == 0);
                }
                that.toggleChipAdded(true);
              }
            }
          });
      })();

      document.oncontextmenu = function() {
        if (hovering) return false;
      };
    })(jQuery);

    var divs = document.getElementsByTagName("div");
    for (var i = 0; i < divs.length; i++) {
      var attr = divs[i].getAttribute("data-num");
      if (attr == null) {
        attr = divs[i].getAttribute("data-sector");
        if (attr == null) continue;
        var index = 38 + parseInt(attr);

        var rekt = divs[i].getBoundingClientRect();
        this.squares[index] = new Array(2);
        this.squares[index][1] = rekt.top + 10;
        this.squares[index][0] = rekt.left + 16;
      } else {
        if (attr.indexOf(",") != -1) continue;
        var rekt = divs[i].getBoundingClientRect();
        this.squares[attr] = new Array(2);
        this.squares[attr][1] = rekt.top + 10;
        this.squares[attr][0] = rekt.left + 16;
      }
    }
  },
  watch: {
    getBalance: {
      handler(newValue) {
        this.balance = newValue <= 0 ? 0 : this.getBalance;
      },
      immediate: true
    },
    currentBet: {
      handler(newValue, oldValue) {
        if (newValue > this.balance) this.currentBet = this.balance;
        this.possibleWin = this.calculatePossibleWin(newValue);
      },
      immediate: true
    },
    chips: {
      handler(newValue, oldValue) {
        if (isEmpty(newValue)) this.currentBet = 0;
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    ...mapGetters("roulette", ["getBalance"]),
    isEnoughMoney() {
      return this.currentBet <= this.balance;
    },
    exceedTotalPro() {
      if (this.totalPro >= 0)
        return 0;
      return this.currentBet / (- this.totalPro)
    },
    currentBetTxt() {
      return this.currentBetName;
    },
    maxBet() {
      return this.balance < 500 ? this.balance : 500;
    }
  },
  methods: {
    ...mapActions("roulette", ["saveGame"]),
    place(result) {
      let win = 0;
      let bet = 0;
      const resultString = result >= 37 ? '00' : result;
      result = result >= 37 ? 37 : result;

      if (this.possibleWin <= 0) {
        this.$notify({
          type: "error",
          title: `Lucky number: ${resultString}, but you didn't set any bets!`,
          duration: 10000
        });
        this.reset();
        return;
      }

      for (let i = 0; i < this.bets.length; i++)
        if (this.bets[i] != 0) bet += this.bets[i];

      if (this.bets[result] === 1) win = this.currentBet * this.currentTier;
      for (let i = 39; i < this.bets.length; i++)
        if (this.bets[i] != 0) {
          win += this.currentBet * this.sectormultipliers[i - 39][result];
        }

      if (win > 0) {
        win = this.possibleWin + this.currentBet;
        this.$notify({
          type: "success",
          title: `Lucky number: ${resultString} <br/>You win ${win} FLX!`,
          duration: 10000
        });
      } else {
        win -= this.currentBet;
        this.$notify({
          type: "error",
          title: `Lucky number: ${resultString} <br/>You lost ${win.toFixed(2)} FLX!`,
          duration: 10000
        });
      }
      this.saveGame({
        bet: this.currentBet,
        target: this.currentBetName,
        possibleWin: this.possibleWin,
        spin: result,
        profit: win,
        win: win > 0
      }).then(res => {
        if (isEmpty(res)) {
          this.$notify({
            type: "error",
            title: `Server error`,
            duration: 10000
          });
        } else {
          this.balance += res.win ? this.possibleWin : -res.bet;
          this.totalPro += res.win ? this.possibleWin : -res.bet;
        }
        this.currentBet = 0;
        this.possibleWin = 0;
        return;
      });
    },
    toggleChipAdded(isAdded) {
      if (!this.canBet) return;
      if (!isAdded) this.currentBetName = "";
      this.isChipAdded = isAdded;
    },
    reset() {
      if (!this.canBet) return;

      for (let i = 0; i < this.bets.length; i++) {
        this.bets = map(this.bets, el => 0);
        if (this.chips[i] != null) {
          for (let j = 0; this.chips[i].length > 0; j++)
            document.body.removeChild(this.chips[i].pop());
        }
      }
      this.currentBetName = "";
      this.chips = [];
      this.possibleWin = 0;
      this.currentBet = 0;
      this.totalPro = 0;           // Added by Maksim
      this.toggleChipAdded(false);
    },
    changeBet(id, amount, numbers, isFirst) {
      if (this.isChipAdded || this.canBet === false) return;
      if (amount > 0) {
        if (isFirst) this.addChip(id, numbers);

        this.currentTier = this.calculateTier(numbers);
        this.currentBetName = this.getCurrentBetName(numbers);
        this.possibleWin = this.calculatePossibleWin(this.currentBet);
      }
      if (amount < 0 && this.chips[id] != null && this.chips[id].length > 0) {
        document.body.removeChild(this.chips[id].pop());
        this.chips = [];
        this.possibleWin = 0;
      }

      this.bets[id] += +amount;

      if (this.bets[id] < 0) {
        this.bets[id] = 0;
      }
      this.bets = clone(this.bets);
    },
    calculatePossibleWin(currentBet) {
      return this.currentTier * currentBet;
    },
    changeCanBet(canBet) {
      this.canBet = canBet;
    },
    calculateTier(bet) {
      let tier = 0;

      if (this.selectorsRules(bet).isSingleNumber) tier = 35;
      if (this.selectorsRules(bet).isTwoNumbers) tier = 17;
      if (this.selectorsRules(bet).isThreeNumbers) tier = 11;
      if (this.selectorsRules(bet).isFourNumbers) tier = 8;
      if (this.selectorsRules(bet).isFirstFive) tier = 6;
      if (this.selectorsRules(bet).isSixNumbers) tier = 5;
      if (
        bet === 39 ||
        bet === 40 ||
        bet === 41 ||
        bet === 42 ||
        bet === 43 ||
        bet === 44
      )
        tier = 2; // 2 to 1 & 1st,2nd,3rd 12
      if (
        bet === 45 ||
        bet === 46 ||
        bet === 47 ||
        bet === 48 ||
        bet === 49 ||
        bet === 50
      )
        tier = 1; // 1-18, Even, Red, Black, Odd, 19-36
      return tier;
    },
    getCurrentBetName(bet) {
      let name = "";
      if (this.selectorsRules(bet).isFirstFour) name = "first four";
      else if (this.selectorsRules(bet).isFirstFive) name = "first five";
      else if (bet === 39) name = "third 2 to 1";
      else if (bet === 40) name = "second 2 to 1";
      else if (bet === 41) name = "first 2 to 1";
      else if (bet === 42) name = "1st 12";
      else if (bet === 43) name = "2nd 12";
      else if (bet === 44) name = "3rd 12";
      else if (bet === 45) name = "1 to 18";
      else if (bet === 46) name = "EVEN";
      else if (bet === 47) name = "RED";
      else if (bet === 48) name = "BLACK";
      else if (bet === 49) name = "ODD";
      else if (bet === 50) name = "19 to 36";
      else if (
        this.selectorsRules(bet).isSingleNumber ||
        this.selectorsRules(bet).isTwoNumbers ||
        this.selectorsRules(bet).isThreeNumbers ||
        this.selectorsRules(bet).isFourNumbers ||
        this.selectorsRules(bet).isSixNumbers
      )
        name = bet;

      return name;
    },
    selectorsRules(bet) {
      const betString = bet.toString();
      const betSplit = betString.split(",");
      return {
        isSingleNumber: (typeof bet === "number" && bet <= 36) || bet === 38, // 38 === double zero
        isTwoNumbers: betSplit.length === 2,
        isThreeNumbers: betSplit.length === 3,
        isFourNumbers: betSplit.length === 4,
        isSixNumbers: betSplit.length === 6,
        isFirstFour: bet === "0,1,2,3",
        isFirstFive: bet === "38,0,3,2,1"
      };
    },
    totalBets() {
      let r = 0;
      for (let i = 0; i < this.bets.length; i++) r += this.bets[i];
      return r;
    },
    addChip(id, numbers) {
      const isThree = numbers.toString().split(",").length === 3;
      const isFour =
        numbers.toString().split(",").length === 4 &&
        numbers.toString() !== "0,1,2,3";
      const isSix = numbers.toString().split(",").length === 6;
      let img = document.createElement("img");
      img.src = require("~/assets/images/roulette_chips.svg");
      img.style.zIndex = "60001";
      img.style.position = "absolute";

      const rX = this.rInt(-10, 10);
      const rY = this.rInt(-10, 10);
      img.style.left = this.squares[id][0] + rX + "px";
      img.style.top = this.squares[id][1] + rY + "px";

      if (this.selectorsRules(numbers).isThreeNumbers) {
        img.style.left = this.squares[id][0] - 10 + "px";
        img.style.top = this.squares[id][1] - 40 + "px";
      }
      if (this.selectorsRules(numbers).isFourNumbers) {
        img.style.left = this.squares[id][0] + 10 + "px";
        img.style.top = this.squares[id][1] - 25 + "px";
      }
      if (this.selectorsRules(numbers).isFirstFour) {
        img.style.left = this.squares[id][0] + 25 + "px";
        img.style.top = this.squares[id][1] - 20 + "px";
      }
      if (this.selectorsRules(numbers).isFirstFive) {
        img.style.left = this.squares[id][0] + 25 + "px";
        img.style.top = this.squares[id][1] + 35 + "px";
      }
      if (isSix) {
        img.style.left = this.squares[id][0] + 10 + "px";
        img.style.top = this.squares[id][1] + 15 + "px";
      }
      if (numbers === "38,2,3") {
        img.style.left = this.squares[id][0] + 20 + "px";
        img.style.top = this.squares[id][1] + 20 + "px";
      }

      img.style.width = "26px";
      img.style.backgroundColor = "#fff";
      img.style.borderRadius = "50%";
      img.style.border = "1px solid #1200FD";
      img.style.pointerEvents = "none";

      document.body.appendChild(img);

      if (this.chips[id] == null) this.chips[id] = new Array(0);
      this.chips[id].push(img);
      this.chips = clone(this.chips);
    },
    rInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  },
  beforeDestroy() {
    this.canBet = true;
    this.reset();
  }
};
</script>

<style scoped>
.board {
  width: 1230px;
  background-color: #1c7022;
  background-size: cover;
  border: 8px solid #865d43;
  border-radius: 160px;
  height: 580px;
  padding: 12px 0 0px 20px;
}
.body-board {
  margin-top: 24px;
  margin-left: 20px;
  width: 720px;
}
.board-info {
  width: 700px;
  top: -20px;
  position: relative;
}
.board-info > div {
  height: 110px;
  width: 300px;
}
.board-info h4 {
  font-weight: 500;
}
#possible-win .info-label {
  width: 120px;
  text-align: center;
}
.board-balance {
  top: 16px;
  position: relative;
}
.info-label {
  background-color: #ffffff;
  padding: 4px 16px;
  border-radius: 4px;
}
.body-board.moving {
  cursor: move;
}
.roulette {
  z-index: 60000; /* Prevent notification cover */
  transform-origin: left;
  margin-left: 40px;
  transform: scale(0.8);
  margin: 10px;
  padding: 40px;
  background: #1c7022;
  display: table;
  position: relative;
  width: 775px;
  border: 7px solid #3cbc2d;
  border-radius: 25px;
  padding-left: 54px;
  /*transform: rotate(90deg);
  margin:300px 0 0 -230px;*/
}

.roulette table {
  float: left;
  width: 780px;
  height: 252px;
}

.roulette table,
tr {
  border-collapse: collapse;
  /*border-spacing: 0;*/
}

.roulette td {
  border-spacing: 0;
  border-collapse: collapse;
  border: 2px solid white;
  width: 50px;
  height: 46px;
  text-align: center;
  vertical-align: middle;
  font-weight: bold;
  font-size: 18px;
  color: white;
  white-space: nowrap;
}

/* elements */
.roulette .sector {
  background: #1c7022;
  color: #8eb891;
}

.roulette .sector .vt {
  font-size: 15px;
}

.roulette .num {
  font-size: 22px;
}

.roulette .num span {
  display: block;
  transform: rotate(270deg);
}

.roulette .double-zero {
  /* width: 70px; */
  font-size: 50px;
  height: 76px;
  width: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 35px;
  border: 1px solid #fff;
  border-bottom: none;
  top: 40px;
}
.roulette .zero {
  /* width: 70px; */
  font-size: 50px;
  height: 76px;
  width: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 115px;
  left: 35px;
  border: 1px solid #fff;
}

.roulette .empty-bet {
  border: none;
}

/* colors */
.roulette .green {
  background: #1c7022;
  color: #8eb891;
}

.roulette .red {
  background: #a91607;
  color: #8eb891;
}

.roulette .black {
  background: #0e3811;
  color: #8eb891;
}

/* cells hovers */
.roulette .sector.hover,
.roulette .num.hover {
  font-size: 26px;
  -moz-box-shadow: inset 0 0 5px #fff, inset 0 0 5px #fff;
  -webkit-box-shadow: inset 0 0 5px #fff, inset 0 0 5px #fff;
  box-shadow: inset 0 0 5px #fff, inset 0 0 5px #fff;
}

.roulette .sector.hover .vt {
  font-size: 17px;
}

.roulette .sector.hover {
  font-size: 22px;
  background: #1c9022 !important;
  color: #fbec0f !important;
}

.roulette .green.hover {
  font-size: 68px;
  background: #3cc042 !important;
  color: #fbec0f !important;
}

.roulette .red.hover {
  background: #c00 !important;
  color: #fbec0f !important;
}

.roulette .black.hover {
  background: #000 !important;
  color: #fbec0f !important;
}

/* orientation */
.roulette .vt {
  display: block;
  transform: rotate(270deg);
  white-space: nowrap;
}

/* controlls */
.roulette .controlls {
  position: relative;
  top: 0;
  /* left: 0; */
  left: -12px;
  opacity: 0;
}

.roulette .controlls .btn-bet {
  /*opacity: 0.5;*/
  position: absolute;
  cursor: pointer;
  z-index: 1;
  background: wheat;
}

/* double-zero */
.roulette .controlls .btn-double-zero {
  width: 75px;
  height: 76px;
  z-index: 0;
}
/* zero */
.roulette .controlls .btn-zero {
  top: 76px;
  width: 75px;
  height: 76px;
  z-index: 0;
}

/* positions */
.roulette .controlls .h {
  width: 37px;
  height: 15px;
}

.roulette .controlls .v {
  width: 17px;
  height: 35px;
}

.roulette .controlls .c {
  width: 17px;
  height: 15px;
}

.roulette .controlls .m {
  width: 54px;
  height: 50px;
  margin-top: -7px;
  margin-left: -10px;
  z-index: 0;
}

.roulette .controlls .ms4 {
  width: 216px;
  height: 50px;
  margin-top: -7px;
  margin-left: -10px;
  z-index: 0;
}

.roulette .controlls .ms2 {
  width: 108px;
  height: 50px;
  margin-top: -7px;
  margin-left: -10px;
  z-index: 0;
}

/* rows */
.roulette .controlls .row1 .rh {
  top: -7px;
}

.roulette .controlls .row1 .rm {
  top: 8px;
}

.roulette .controlls .row2 .rh {
  top: 43px;
}

.roulette .controlls .row2 .rm {
  top: 58px;
}

.roulette .controlls .row3 .rh {
  top: 93px;
}

.roulette .controlls .row3 .rm {
  top: 108px;
}

.roulette .controlls .row3 .rb {
  top: 143px;
}

.roulette .controlls .row4 .rm {
  top: 158px;
}

.roulette .controlls .row5 .rm {
  top: 208px;
}

/* cols */
.roulette .controlls .col1 .cv {
  left: 68px;
}

.roulette .controlls .col1 .cm {
  left: 85px;
}

.roulette .controlls .col2 .cv {
  left: 122px;
}

.roulette .controlls .col2 .cm {
  left: 139px;
}

.roulette .controlls .col3 .cv {
  left: 176px;
}

.roulette .controlls .col3 .cm {
  left: 193px;
}

.roulette .controlls .col4 .cv {
  left: 230px;
}

.roulette .controlls .col4 .cm {
  left: 247px;
}

.roulette .controlls .col5 .cv {
  left: 284px;
}

.roulette .controlls .col5 .cm {
  left: 301px;
}

.roulette .controlls .col6 .cv {
  left: 338px;
}

.roulette .controlls .col6 .cm {
  left: 355px;
}

.roulette .controlls .col7 .cv {
  left: 392px;
}

.roulette .controlls .col7 .cm {
  left: 409px;
}

.roulette .controlls .col8 .cv {
  left: 446px;
}

.roulette .controlls .col8 .cm {
  left: 463px;
}

.roulette .controlls .col9 .cv {
  left: 500px;
}

.roulette .controlls .col9 .cm {
  left: 517px;
}

.roulette .controlls .col10 .cv {
  left: 554px;
}

.roulette .controlls .col10 .cm {
  left: 571px;
}

.roulette .controlls .col11 .cv {
  left: 608px;
}

.roulette .controlls .col11 .cm {
  left: 625px;
}

.roulette .controlls .col12 .cv {
  left: 662px;
}

.roulette .controlls .col12 .cm {
  left: 679px;
}

.roulette .controlls .col13 .cm {
  left: 733px;
}

/* others */
.hidden {
  /* display: none; */
  opacity: 0;
  border-left: none !important;
  border-bottom: none !important;
}
</style>