# Project Plan

## Initial thoughts.

The input for this project seems relatively simple. I initially understood the input argument to look like something like this if represented in JSON.

**Input Object**

```json
{
  "gridSize": "5 3",
  "robots": [
    {
      "startPosition": "1 1 E",
      "moves": "RFRFRFRF"
    },
    {
      "startPosition": "3 2 N",
      "moves": "FRRFLLFFRRFLL"
    },
    {
      "startPosition": "0 3 W",
      "moves": "LLFFFLFLFL"
    }
  ]
}
```

I decided to build this as an API endpoint that can accept this JSON data.
