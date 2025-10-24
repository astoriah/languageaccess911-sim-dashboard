/**
 * Caller Information Module
 * 
 * Handles the caller information form inputs:
 * - Caller name
 * - Caller phone number
 * - Emergency type
 * - IDC (International Diagnostic Code)
 */

import { state } from './state.js';

export function initCallerInfoForm() {
  const callerNameInput = document.getElementById("caller-name");
  const callerNumberInput = document.getElementById("caller-number");
  const typeSelect = document.getElementById("type");
  const idcCodeInput = document.getElementById("idc-code");

  callerNameInput.addEventListener("input", function (e) {
    state.callerInfo.callerName = e.target.value;
  });

  callerNumberInput.addEventListener("input", function (e) {
    state.callerInfo.callerNumber = e.target.value;
  });

  typeSelect.addEventListener("change", function (e) {
    state.callerInfo.type = e.target.value;
  });

  idcCodeInput.addEventListener("input", function (e) {
    state.callerInfo.idcCode = e.target.value;
  });
}
