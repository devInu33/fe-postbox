import { Visitor } from "./Visitor.js";
import { Mailbox } from "./Mailbox.js";

export const randomBoolean = () => Math.random() < 0.5;
export const quickSort = (array, compare, left = 0, right = array.length - 1  ) => {
  if (left >= right) {
    return;
  }

  const mid = Math.floor((left + right) / 2);
  const pivot = array[mid];
  const partition = divide(array, left, right, pivot);
  quickSort(array, compare, left, partition - 1);
  quickSort(array, compare, partition, right);
  function divide(array, left, right, pivot) {
    while (left<= right) {
      while (compare(array[left], pivot)) {
        left++;
      }
      while (compare(array[right],pivot)) {
        right--;
      }
      if (left <= right) {
        let swap = array[left];
        array[left] = array[right];
        array[right] = swap;
        left++;
        right--;
      }
    }
    return left;
  }
  return array;
};

export const randomNum = (num) => Math.floor(Math.random() * num)+1;
export const action = (element) => {
  if (element.classList.contains("mailbox")) {
    Visitor.sizes.push(element.dataset.size);
  } else if (element.classList.contains("town")) {
    Visitor.towns.push(element.dataset.name);
  } else return;
};

export const randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
