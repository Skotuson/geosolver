# GeoSolver 
👷Work in progress👷  
Very simple app with the purpose to make solving the final coordinates for a Mystery/Multipart cache easier. [^1]

## "Roadmap" 🗺️
- Better responsive design (functional but barebones at the moment).
- Button design change (currently, they are moved with each added letter input and can be cumbersome to use).
- Error reporting.

## How to use
The final coordinates of such geocaches usually have some parts replaced with letters like `A,B,C,...`, such as this example:  
`N49°32,(A-D)(G)(E+H)' E15°21,(F-C)(D)(B-H)'`

The app has 3 buttons, `+,=` and `-`. The `+` and `-` add/remove an input boxes for the individual letters.  

The `=` starts the calculation of the final coordinates. The letters are substituted with the provided values and evaluated.

[^1]: https://www.geocaching.com/about/cache_types.aspx
