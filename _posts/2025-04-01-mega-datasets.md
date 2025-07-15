---
layout: distill
title: Creating an MRI Mega-Dataset
description: how we collected over 80k high-quality, publicly available image volumes
tags: mri t1-weighted open-data processing
thumbnail: assets/img/img.png
giscus_comments: false
date: 2025-07-01
featured: false

authors:
  - name: Blake Dewey
    affiliations:
      name: Neurology, Johns Hopkins University

bibliography: 2018-12-22-distill.bib

toc:
  - name: Background
  - name: Why T$_1$-weighted Images?
  - name: Collecting Datasets
  - name: Minimal Preprocessing

---

## Background
In the last decade, neuroscience has seen an explosion of data-driven approaches—especially those relying on magnetic resonance imaging (MRI) to probe the structure and function of the human brain. Structural MRI, and in particular T$_1$-weighted scans, provide high-resolution anatomical detail that supports a large research field, ranging from mapping functional imaging to structural locations, to building disease-prediction models, and to exploring the effects of neurodegeneration. Large generative AI models, such as Denoising Diffusion Probabilistic Models (DDPMs), require a massive amount of training data to learn the dataset distribution properly. However, currently, individual, publicly available datasets lack the size and variability necessary to prevent overfitting and generalize across scanner vendors, field strengths, and demographic subgroups.

To train a robust, representative generative model, we require more than any single dataset, both from a patient and scan variability perspective. However, freely available MRI datasets mostly live in siloed repositories — each with its own file formats, naming conventions, license terms, and quality-control protocols. A researcher combining data from multiple datasets must navigate different APIs and websites, standardized file types and naming, and ensure similar data quality. Every lab builds its own data‐wrangling pipeline, having to augment its workflows for each new data source. Some work has been done to standardize this process, using tools like DataLad<d-footnote><a href="https://www.datalad.org">https://www.datalad.org</a></d-footnote>. This is the case for OpenNeuro<d-footnote><a href="https://www.openneuro.org">https://www.openneuro.org</a></d-footnote>, but due to licensing and data access requirements, it is not always easy to set up straightfoward access like this.

We can’t say that we solved this particular problem. We can’t reproduce this dataset for public consumption due to license restrictions, but we can explain our design, thought processes, and pain points to help you develop your own mega-dataset.

## Why T$_1$-weighted Images? {#why-t-1-weighted-images}
<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/pass-imgs.png" class="img-fluid rounded z-depth-1" figure_class="with-caption" %}
    </div>
</div>
<div class="caption">
    T$_1$-weighted images of the brain can be acquired with several different methods, but are easily acquired at high-resolution and with good anatomical detail.
</div>

T$_1$-weighted images are the backbone of structural neuroimaging, especially in the research sphere. T$_1$-weighted images have strong contrast between gray matter, white matter, and cerebrospinal fluid, enabling accurate delineation of cortical and subcortical structures. This lends them to be used frequently by machine learning projects, such as segmentation models, but also for studies of neurodegeneration, like normative brain aging curves. In addition, nearly every neuroimaging research study includes T$_1$-weighted scans, making them the natural "common denominator" when collecting scans from multiple datasets. 

The main reason that we chose T$_1$-weighted images (in addition to those already mentioned), is the availablity of high-resolution, isotropic images. Mainly freely available MRI datasets include multiple contrasts, but amoung them, only T$_1$-weighted images are consistently high-resolution (around 1mm in each direction). When building a baseline generative model, we looked to provide the best quality data, including in resolution, to ease the burden on the model.

## Collecting Datasets
Our requirements for this project were than the data be freely-available (i.e. no fee for access). This automatically limited us from one of the largest T$_1$-weighted datasets of the time, the UK Biobank, which charges £9k for access to the imaging data, but we were still able to find plenty of imaging datasets. However, there were still plenty out there, if you took the time to collect them all. Even after curating for images that were $\leq$1.2mm in each direction and didn't have excessive artifacts or pathology, we were able to find over 80k images over 38 publicly available datasets.

| Dataset Name |     License | Requirements |  Subjects |   Volumes |
|:-------------|------------:|-------------:|----------:|----------:|
| A4           |         DUA |            A |      1742 |      6903 |
| ABIDE        | CC BY-NC-SA |            A |       781 |       781 |
| ABIDEII      | CC BY-NC-SA |            A |       959 |      1221 |
| ADNI         |         DUA |        A/B/N |      2587 |     17965 |
| AIBL         |         DUA |        C/A/N |       673 |      1203 |
| AOMIC-ID1000 |         CC0 |            C |       928 |      2768 |
| AOMIC-PIOP1  |         CC0 |            C |       216 |       216 |
| AOMIC-PIOP2  |         CC0 |            C |       226 |       226 |
| BHRC         | CC BY-NC-SA |            C |       609 |       902 |
| CCNP         | CC BY-NC-SA |            C |       195 |       195 |
| COBRE        |    CC BY-NC |            C |       193 |      1275 |
| COGTRAIN     |         CC0 |            C |       166 |       293 |
| CORR         |    CC BY-NC |            C |      1178 |      2332 |
| DLBS         |         CC0 |            C |       314 |       314 |
| FCON1000     |    CC BY-NC |            C |       563 |       563 |
| GSP          |         DUA |          C/A |      1570 |      1639 |
| HABS         |         DUA |        A/B/N |      4233 |      6437 |
| HBN          | CC BY-NC-SA |            C |      2398 |      2398 |
| HCP1200      |         DUA |            A |      1112 |      1112 |
| ICBM         |         DUA |            A |       444 |       444 |
| IXI          |    CC BY-NC |            A |       581 |       581 |
| MCSA         |         DUA |        A/B/N |      1799 |      3087 |
| MPILEMON     |        PDDL |            C |       226 |       226 |
| NACC         |         DUA |          A/N |      3680 |      5472 |
| NADR         |         CC0 |            C |       301 |       301 |
| NARRATIVES   |         CC0 |            C |       315 |       348 |
| NEUROPHENOM  |         CC0 |            C |       265 |       265 |
| NIMHHRVD     |         CC0 |            C |       249 |       499 |
| NKI          |    CC BY-NC |            C |      1314 |      2254 |
| OASIS3       |         DUA |          C/A |      1340 |      3493 |
| OASIS4       |         DUA |          C/A |       655 |       723 |
| PNC          | CC BY-NC-SA |            C |      1600 |      1600 |
| PPMI         |         DUA |            A |      1975 |      3748 |
| QTIM         |         CC0 |            C |      1199 |      1339 |
| SALD         |    CC BY-NC |            C |       494 |       494 |
| SCAN         |         DUA |          A/N |      4702 |      5886 |
| SLEEP        |         CC0 |            C |       136 |       136 |
| SLIM         |    CC BY-NC |            C |       588 |      1036 |
| **Total**    |             |              | **42506** | **80675** |

<div class="caption">
    Datasets collected in our mega dataset. <br/>
    Requirements: A - Acknowledgement, B - Byline in Author List, C - Citation, N - Notice/Submission of Manuscript
</div>
Most of these datasets are released under one of the Creative Commons Licenses, but many require a form of data use agreement to access. These mainly boil down to restricting you not to try to re-identify any subjects or from distributing the data yourself, but they can also have provisions to require specific attributions in academic papers and/or paper reviews. Different datasets have different requirements for use. We have included them here, but as they may change, refer to original dataset documentation and data use agreements for up-to-date information.

## Minimal Processing
We want to keep the variety in our dataset, so we avoid any kind of excessive processing, but we also need to use these in training deep neural networks. So, they should be at least all the same size and point in the same direction. To do this, we:
1. Reoriented the images to axial orientation (Right Anterior Inferior)
2. Interpolated the images to 1mm isotropic resolution
3. Cropped/padded the images using the brain center of mass (192x224x192mm field of view)
4. Scaled the images to $[0, 2^{16}-1]$ and cast the floating point values to 16-bit integers

These steps allow us to minimize the storage footprint of the images (still over 700GB for the whole dataset), while still maintaining the "raw" appearance of each image volume.