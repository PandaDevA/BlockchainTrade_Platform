import Vue from "vue";
import KeenUI from "keen-ui";
import "keen-ui/dist/keen-ui.css";
import AButton from "@/components/_shared/AButton";
import AModal from "@/components/_shared/AModal";
import ASpinner from "@/components/_shared/ASpinner";
import AProgressBar from "@/components/_shared/AProgressBar";

Vue.use(KeenUI);

Vue.component("AButton", AButton);
Vue.component("AModal", AModal);
Vue.component("ASpinner", ASpinner);
Vue.component("AProgressBar", AProgressBar);
