# simple-gallery-multi-image
A multi-image gallery jQuery plugin based on [simple-gallery](https://github.com/LeeroyJenks/simple-gallery).

## Demo
[plugins.getdans.info/simple-gallery-multi-image](http://plugins.getdans.info/simple-gallery-multi-image)

## Installation
Download from GitHub

### Requirements
jQuery

### Use
```html
<script>
    $(document).ready(function(){
        $('.image-gallery').multiImageGallery({
            slidesContainer: '.slides'
        });
    });
</script>
```
### Description

Some minor CSS must be used in order to get the gallery working properly. You'll need to define the width of the image gallery. `slidesContainer` must be defined for the gallery to work properly.
Previous and Next buttons must also be added. Touch is already in place.

### Example

```html
<style>
    .image-gallery {
        display: block;
        position: relative;
        margin: 0 auto;
        width: 90%;
        max-width: 600px;
        background-color: #00ACC1;
        margin-top: 140px;
        border: 20px solid #00ACC1;
    }
    
    .image-gallery .slides {
        width: 100%;
        display: block;
        position: relative;
        padding: 0;
        margin: 0;
        list-style: none;
    }
    
    .image-gallery .slides .slide {
        width: 100%;
        height: auto;
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
        align-content: center;
    }
    
    .image-gallery .slides .slide img {
        display: inline-block;
        height: auto;
        width: 48%;
        height: auto;
        vertical-align: middle;
    }
    
    .image-gallery .prev {
        display: block;
        position: absolute;
        bottom: 100%;
        left: -20px;
        margin-bottom: 23px;
        text-decoration: none;
    }
    
    .image-gallery .next {
        display: block;
        position: absolute;
        bottom: 100%;
        right: -20px;
        margin-bottom: 23px;
        text-decoration: none;
    }
</style>

<div class="image-gallery">
    <ul class="slides">
        <li class="slide"><img src="IMAGE_1.jpg" alt="Image 1" /><img src="IMAGE_2.jpg" alt="Image 2" /></li>
        <li class="slide"><img src="IMAGE_3.jpg" alt="Image 3" /><img src="IMAGE_4.jpg" alt="Image 4" /></li>
        <li class="slide"><img src="IMAGE_5.jpg" alt="Image 5" /><img src="IMAGE_6.jpg" alt="Image 6" /></li>
    </ul>
    <a href="javascript:void(0)" class="prev">Previous</a>
    <a href="javascript:void(0)" class="next">Next</a>
</div>


<script>
    /* allow page to load before running simpleGallery */
    $(window).on('load', function() {
        $('.image-gallery').multiImageGallery({
            slidesContainer: '.slides'
        });
    });
</script>
```

### Options

Options            | Definition
------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
`slidesContainer`  | Parent container of slides.<br>`default: '.images-list'`
`adaptiveHeight`   | Whether the gallery height should adapt to the image being displayed (`true`) or if the image should adapt to the gallery height (`false`)<br>`default: true`
`description`      | Read description above for full details. List of data atributes used in description as an array. ie `['title', 'description']`.<br>`default: false`
`imagesPerSlide`   | `default: 2`
