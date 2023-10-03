# Changelog

### 0.2.6

Release 3 oct 2023

  * Fix check to delete confetti particles that are not visible.

### 0.2.5

Release 3 oct 2023

  * Reverts elimination prevention of confetti. It is more optimal coordinates such as 0.001 (top or left) or 1.999 (right or bottom).

### 0.2.4

Release 3 oct 2023

  * Added confeti elimination prevention if created outside of canvas (100 extra pixels).
  * Added static confetti option to readme.
  * Change default confetti Y origin to 0.7.
  * Code refactorization.

### 0.2.3

Release 2 oct 2023

  * Added static confetti option.
  * Fixed SSR checks.
  * Fixed types when add confetti props.

### 0.2.0

Release 2 oct 2023

  * Added option to disable ticks (opacity). Put -1 on ticks.
  * Added window checks to avoid server execution errors (SSR).
  * Changed the z-index by default of the canvas. Now is  Number.MAX_SAFE_INTEGER (2147483647).

### 0.1.2

Release 2 oct 2023

  * Added particle position check to delete it from array when it comes out of canvas.

### 0.1.0

Release 1 oct 2023

  * First version