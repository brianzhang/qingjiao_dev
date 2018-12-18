
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<!DOCTYPE html>
<!--
Copyright 2012 Mozilla Foundation

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->
<html dir="ltr" mozdisallowselectionprint moznomarginboxes>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<!--#if GENERIC || CHROME-->
    <meta name="google" content="notranslate">
<!--#endif-->
    <title>PDF.js viewer</title>

<!--#if FIREFOX || MOZCENTRAL-->
<!--#include viewer-snippet-firefox-extension.html-->
<!--#endif-->
<!--#if CHROME-->
<!--#include viewer-snippet-chrome-extension.html-->
<!--#endif-->

    <link rel="stylesheet" href="${ctx }/styles/commons/css/gxy/pdf/viewer.css"/>
<!--#if !PRODUCTION-->
    <link rel="resource" type="application/l10n" href="locale/locale.properties"/>
<!--#endif-->

<!--#if !(FIREFOX || MOZCENTRAL || CHROME)-->
    <script type="text/javascript" src="${ctx }/js/lc/components/pdf/web/compatibility.js"></script>
<!--#endif-->

<!--#if !PRODUCTION-->
    <script type="text/javascript" src="${ctx }/js/lc/components/pdf/external/webL10n/l10n.js"></script>
<!--#endif-->

<!--#if !PRODUCTION-->
    <script type="text/javascript" src="${ctx }/js/lc/components/pdf/src/shared/util.js"></script>
    <script type="text/javascript" src="${ctx }/js/lc/components/pdf/src/shared/colorspace.js"></script>
    <script type="text/javascript" src="${ctx }/js/lc/components/pdf/src/shared/function.js"></script>
    <script type="text/javascript" src="${ctx }/js/lc/components/pdf/src/shared/annotation.js"></script>
    <script type="text/javascript" src="${ctx }/js/lc/components/pdf/src/display/api.js"></script>
    <script type="text/javascript" src="${ctx }/js/lc/components/pdf/src/display/metadata.js"></script>
    <script type="text/javascript" src="${ctx }/js/lc/components/pdf/src/display/canvas.js"></script>
    <script type="text/javascript" src="${ctx }/js/lc/components/pdf/src/display/pattern_helper.js"></script>
    <script type="text/javascript" src="${ctx }/js/lc/components/pdf/src/display/font_loader.js"></script>
    <script type="text/javascript">PDFJS.workerSrc = '${ctx }/js/lc/components/pdf/src/worker_loader.js';</script>
<!--#endif-->

<!--#if GENERIC -->
<!--#include viewer-snippet.html-->
<!--#endif-->

<!--#if !PRODUCTION-->
    <script type="text/javascript" src="${ctx }/js/lc/components/pdf/web/ui_utils.js"></script>
    <script type="text/javascript" src="${ctx }/js/lc/components/pdf/web/default_preferences.js"></script>
    <script type="text/javascript" src="${ctx }/js/lc/components/pdf/web/preferences.js"></script>
    <script type="text/javascript" src="${ctx }/js/lc/components/pdf/web/download_manager.js"></script>
    <script type="text/javascript" src="${ctx }/js/lc/components/pdf/web/view_history.js"></script>
    <script type="text/javascript" src="${ctx }/js/lc/components/pdf/web/page_view.js"></script>
    <script type="text/javascript" src="${ctx }/js/lc/components/pdf/web/thumbnail_view.js"></script>
    <script type="text/javascript" src="${ctx }/js/lc/components/pdf/web/text_layer_builder.js"></script>
    <script type="text/javascript" src="${ctx }/js/lc/components/pdf/web/pdf_find_bar.js"></script>
    <script type="text/javascript" src="${ctx }/js/lc/components/pdf/web/pdf_find_controller.js"></script>
    <script type="text/javascript" src="${ctx }/js/lc/components/pdf/web/pdf_history.js"></script>
    <script type="text/javascript" src="${ctx }/js/lc/components/pdf/web/secondary_toolbar.js"></script>
    <script type="text/javascript" src="${ctx }/js/lc/components/pdf/web/password_prompt.js"></script>
    <script type="text/javascript" src="${ctx }/js/lc/components/pdf/web/presentation_mode.js"></script>
    <script type="text/javascript" src="${ctx }/js/lc/components/pdf/web/grab_to_pan.js"></script>
    <script type="text/javascript" src="${ctx }/js/lc/components/pdf/web/hand_tool.js"></script>
    <script type="text/javascript" src="${ctx }/js/lc/components/pdf/web/document_properties.js"></script>
<!--#endif-->

    <script type="text/javascript" src="${ctx }/js/lc/components/pdf/web/debugger.js"></script>
    <script type="text/javascript" src="${ctx }/js/lc/components/pdf/web/viewer.js"></script>

  </head>

  <body tabindex="1">
    <div id="outerContainer" class="loadingInProgress">

      <div id="sidebarContainer">
        <div id="toolbarSidebar">
          <div class="splitToolbarButton toggled">
            <button id="viewThumbnail" class="toolbarButton group toggled" title="Show Thumbnails" tabindex="2" data-l10n-id="thumbs">
               <span data-l10n-id="thumbs_label">Thumbnails</span>
            </button>
          </div>
        </div>
        <div id="sidebarContent">
          <div id="thumbnailView">
          </div>
          <div id="outlineView" class="hidden">
          </div>
        </div>
      </div>  <!-- sidebarContainer -->

      <div id="mainContainer">
        <div class="findbar hidden doorHanger hiddenSmallView" id="findbar">
          <label for="findInput" class="toolbarLabel" data-l10n-id="find_label">Find:</label>
          <input id="findInput" class="toolbarField" tabindex="41">
          <div class="splitToolbarButton">
            <button class="toolbarButton findPrevious" title="" id="findPrevious" tabindex="42" data-l10n-id="find_previous">
              <span data-l10n-id="find_previous_label">Previous</span>
            </button>
            <div class="splitToolbarButtonSeparator"></div>
            <button class="toolbarButton findNext" title="" id="findNext" tabindex="43" data-l10n-id="find_next">
              <span data-l10n-id="find_next_label">Next</span>
            </button>
          </div>
          <input type="checkbox" id="findHighlightAll" class="toolbarField">
          <label for="findHighlightAll" class="toolbarLabel" tabindex="44" data-l10n-id="find_highlight">Highlight all</label>
          <input type="checkbox" id="findMatchCase" class="toolbarField">
          <label for="findMatchCase" class="toolbarLabel" tabindex="45" data-l10n-id="find_match_case_label">Match case</label>
          <span id="findMsg" class="toolbarLabel"></span>
        </div>  <!-- findbar -->

        <div id="secondaryToolbar" class="secondaryToolbar hidden doorHangerRight">
          <div id="secondaryToolbarButtonContainer">
            <button id="secondaryPresentationMode" class="secondaryToolbarButton presentationMode visibleLargeView" title="Switch to Presentation Mode" tabindex="18" data-l10n-id="presentation_mode">
              <span data-l10n-id="presentation_mode_label">Presentation Mode</span>
            </button>

            <button id="secondaryOpenFile" class="secondaryToolbarButton openFile visibleLargeView" title="Open File" tabindex="19" data-l10n-id="open_file">
              <span data-l10n-id="open_file_label">Open</span>
            </button>

            <button id="secondaryPrint" class="secondaryToolbarButton print visibleMediumView" title="Print" tabindex="20" data-l10n-id="print">
              <span data-l10n-id="print_label">Print</span>
            </button>

            <button id="secondaryDownload" class="secondaryToolbarButton download visibleMediumView" title="Download" tabindex="21" data-l10n-id="download">
              <span data-l10n-id="download_label">Download</span>
            </button>

            <a href="#" id="secondaryViewBookmark" class="secondaryToolbarButton bookmark visibleSmallView" title="Current view (copy or open in new window)" tabindex="22" data-l10n-id="bookmark">
              <span data-l10n-id="bookmark_label">Current View</span>
            </a>

            <div class="horizontalToolbarSeparator visibleLargeView"></div>

            <button id="firstPage" class="secondaryToolbarButton firstPage" title="Go to First Page" tabindex="23" data-l10n-id="first_page">
              <span data-l10n-id="first_page_label">跳至首页</span>
            </button>
            <button id="lastPage" class="secondaryToolbarButton lastPage" title="Go to Last Page" tabindex="24" data-l10n-id="last_page">
              <span data-l10n-id="last_page_label">跳至末页</span>
            </button>

            <div class="horizontalToolbarSeparator"></div>

            <button id="pageRotateCw" class="secondaryToolbarButton rotateCw" title="Rotate Clockwise" tabindex="25" data-l10n-id="page_rotate_cw">
              <span data-l10n-id="page_rotate_cw_label">顺时针旋转90°</span>
            </button>
            <button id="pageRotateCcw" class="secondaryToolbarButton rotateCcw" title="Rotate Counterclockwise" tabindex="26" data-l10n-id="page_rotate_ccw">
              <span data-l10n-id="page_rotate_ccw_label">逆时针旋转90°</span>
            </button>

            <div class="horizontalToolbarSeparator"></div>

            <button id="toggleHandTool" class="secondaryToolbarButton handTool" title="Enable hand tool" tabindex="27" data-l10n-id="hand_tool_enable">
              <span data-l10n-id="hand_tool_enable_label">拖拽模式</span>
            </button>
          </div>
        </div>  <!-- secondaryToolbar -->

        <div class="toolbar">
          <div id="toolbarContainer">
            <div id="toolbarViewer">
              <div id="toolbarViewerLeft">
                <button id="sidebarToggle" class="toolbarButton" title="Toggle Sidebar" tabindex="4" data-l10n-id="toggle_sidebar">
                  <span data-l10n-id="toggle_sidebar_label">Toggle Sidebar</span>
                </button>
                <div class="toolbarButtonSpacer"></div>
                <button id="viewFind" class="toolbarButton group hiddenSmallView" title="Find in Document" tabindex="5" data-l10n-id="findbar">
                   <span data-l10n-id="findbar_label">Find</span>
                </button>
                <div class="splitToolbarButton">
                  <button class="toolbarButton pageUp" title="Previous Page" id="previous" tabindex="6" data-l10n-id="previous">
                    <span data-l10n-id="previous_label">Previous</span>
                  </button>
                  <div class="splitToolbarButtonSeparator"></div>
                  <button class="toolbarButton pageDown" title="Next Page" id="next" tabindex="7" data-l10n-id="next">
                    <span data-l10n-id="next_label">Next</span>
                  </button>
                </div>
                <label id="pageNumberLabel" class="toolbarLabel" for="pageNumber" data-l10n-id="page_label">Page: </label>
                <input type="number" id="pageNumber" class="toolbarField pageNumber" value="1" size="4" min="1" tabindex="8">
                <span id="numPages" class="toolbarLabel"></span>
              </div>
              <div id="toolbarViewerRight">
                <button id="presentationMode" class="toolbarButton presentationMode hiddenLargeView" title="Switch to Presentation Mode" tabindex="12" data-l10n-id="presentation_mode">
                  <span data-l10n-id="presentation_mode_label">Presentation Mode</span>
                </button>

                <button id="openFile" class="toolbarButton openFile hiddenLargeView" title="Open File" tabindex="13" data-l10n-id="open_file">
                  <span data-l10n-id="open_file_label">Open</span>
                </button>

                <button id="print" class="toolbarButton print hiddenMediumView" title="Print" tabindex="14" data-l10n-id="print">
                  <span data-l10n-id="print_label">Print</span>
                </button>

                <button id="download" class="toolbarButton download hiddenMediumView" title="Download" tabindex="15" data-l10n-id="download">
                  <span data-l10n-id="download_label">Download</span>
                </button>
                <!-- <div class="toolbarButtonSpacer"></div> -->
                <a href="#" id="viewBookmark" class="toolbarButton bookmark hiddenSmallView" title="Current view (copy or open in new window)" tabindex="16" data-l10n-id="bookmark">
                  <span data-l10n-id="bookmark_label">Current View</span>
                </a>

                <div class="verticalToolbarSeparator hiddenSmallView"></div>
                
                <button id="secondaryToolbarToggle" class="toolbarButton" title="Tools" tabindex="17" data-l10n-id="tools">
                  <span data-l10n-id="tools_label">Tools</span>
                </button> 
              </div>
              <div class="outerCenter">
                <div class="innerCenter" id="toolbarViewerMiddle">
                  <div class="splitToolbarButton">
                    <button id="zoomOut" class="toolbarButton zoomOut" title="Zoom Out" tabindex="9" data-l10n-id="zoom_out">
                      <span data-l10n-id="zoom_out_label">Zoom Out</span>
                    </button>
                    <div class="splitToolbarButtonSeparator"></div>
                    <button id="zoomIn" class="toolbarButton zoomIn" title="Zoom In" tabindex="10" data-l10n-id="zoom_in">
                      <span data-l10n-id="zoom_in_label">Zoom In</span>
                     </button>
                  </div>
                  <span id="scaleSelectContainer" class="dropdownToolbarButton">
                     <select id="scaleSelect" title="Zoom" tabindex="11" data-l10n-id="zoom">
                      <option id="pageAutoOption" value="auto" selected="selected" data-l10n-id="page_scale_auto">Automatic Zoom</option>
                      <option id="pageActualOption" value="page-actual" data-l10n-id="page_scale_actual">Actual Size</option>
                      <option id="pageFitOption" value="page-fit" data-l10n-id="page_scale_fit">Fit Page</option>
                      <option id="pageWidthOption" value="page-width" data-l10n-id="page_scale_width">Full Width</option>
                      <option id="customScaleOption" value="custom"></option>
                      <option value="0.5">50%</option>
                      <option value="0.75">75%</option>
                      <option value="1">100%</option>
                      <option value="1.25">125%</option>
                      <option value="1.5">150%</option>
                      <option value="2">200%</option>
                    </select>
                  </span>
                </div>
              </div>
            </div>
            <div id="loadingBar">
              <div class="progress">
                <div class="glimmer">
                </div>
              </div>
            </div>
          </div>
        </div>

        <menu type="context" id="viewerContextMenu">
          <menuitem id="contextFirstPage" label="First Page"
                    data-l10n-id="first_page"></menuitem>
          <menuitem id="contextLastPage" label="Last Page"
                    data-l10n-id="last_page"></menuitem>
          <menuitem id="contextPageRotateCw" label="Rotate Clockwise"
                    data-l10n-id="page_rotate_cw"></menuitem>
          <menuitem id="contextPageRotateCcw" label="Rotate Counter-Clockwise"
                    data-l10n-id="page_rotate_ccw"></menuitem>
        </menu>

        <div id="viewerContainer" tabindex="0">
          <div id="viewer"></div>
        </div>
    </div> <!-- outerContainer -->
    <div id="printContainer"></div>
<!--#if !(FIREFOX || MOZCENTRAL)-->
<!--#include viewer-snippet-mozPrintCallback-polyfill.html-->
<!--#endif-->
  </body>
</html>
