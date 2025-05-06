# R360 Web Viewer

Purpose: 
  360 Tour or slideshow experience with hotspot transitions, and details. Available in VR, Desktop, and Mobile. 

Results:
	Completed Media player available across Mobile, Desktop, and VR devices. Minor non-breaking bugs witnessed on firefox. 

## How to Launch

1. **Using Node 18.18.2**
2. *(Edited repos can be removed when a new version of uikit is available with the slider change: [uikit commit](https://github.com/pmndrs/uikit/commit/ccdd6299b491789eec07b2738f9da8eb3bb57eca))*
3. **Download Project**
4. **Run** `npm install` **in root**
5. **Run** `npm install` **in EditedRepos**
6. **Use OpenSSL** to generate `cert.pem` and `key.pem` in the `keys` folder
7. **Create the `tour.json` or `slideshow.json`**
   - Set `type` to `tour` or `slideshow`
     - **Tours**: navigate with hotspots
     - **Slideshows**: navigate iteratively with arrows
   - `destinations` array should include:
     - Image location (in the `public` folder)
     - A unique `id` for the object
     - A list of `hotspots`
   - Each `hotspot` object should include:
     - A position in 3D space (where it will appear)
     - A `type`: either `info` or `tour`
       - **Tour**:
         - Takes you to a new destination
         - Requires a `destinationId` that matches the destination to load
       - **Info**:
         - Opens a text card when clicked
         - Contains a `detailCard` object:
           - `visible`: set to `false` by default; becomes `true` when clicked
           - `title`: heading text shown on click
           - `content`: text to display
     - A unique `id`
   - **Slideshow**:
     - Has a `type`
     - Has a list of `destinations`
     - Each destination has:
       - Image location
       - Unique `id`
8. **Make any modifications to `defaults.json`**
   - `fileLocation` is one important option
9. **Ensure `public` folder contains required files**
   - Any icons mentioned in `defaults.json`
   -	All 512x512 except arrows which are 308x512
10. Run npm run dev
11. Open the site in the browser, accept any risk due to using a self signed certificate for https


## License Links / Credits:
-  free-icons: https://github.com/free-icons/free-icons/blob/master/LICENSE
-  Pmndrs UIKit: https://github.com/pmndrs/uikit
-  Polyhaven: https://polyhaven.com/license
