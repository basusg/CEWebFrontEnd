import { Component,ViewChild, OnInit, SimpleChanges, ViewEncapsulation, EventEmitter, Renderer2, Input,Output, Directive, ElementRef ,HostListener, OnChanges} from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser'
import * as $ from 'jquery';


@Component({
  selector: 'datepicker-popup',
  templateUrl: './editstory.component.html',
  styleUrls: ['./editstory.component.scss'],
})
@Directive({
  selector: '[clickOutside]'
})

export class EditstoryComponent implements OnInit{
  listenFunc: Function;
  event: Date = new Date();
  @Output() onEditorKeyup = new EventEmitter<any>();
  @Input() default_text:any;
  @Input() check_selected=false;
 
  public datepickerConfig: Partial< BsDatepickerConfig > = new BsDatepickerConfig();
  constructor(private elementRef : ElementRef,private sanitizer: DomSanitizer, private renderer: Renderer2){
    this.datepickerConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        showWeekNumbers:false,
        minDate: new Date(2018, 0, 1),
        maxDate: new Date(2018, 11, 31),
        dateInputFormat: 'DD/MM/YYYY'
     });
  }
  multiple_items=new Array();
  delete_index_value:any;
  delete_multiple_items_popup = false;
  learning_tags=new Array();
  selected_learning_tags=new Array();
  __PDF_DOC:any;
  __CURRENT_PAGE:any;
  __TOTAL_PAGES:any;
  __PAGE_RENDERING_IN_PROGRESS = 0;
  __CANVAS :any;
  __CANVAS_CTX :any;

  ngDoCheck(): void {
    this.check_selected=false;
    this.learning_tags.forEach(element => {
      if(element.selected_learning_status){
        this.check_selected=true;
      }
    });
  } 

  @Output()
  public clickOutside = new EventEmitter();
  
  @HostListener('document:click', ['$event'])
  clickedOutside(event){
    // var st=this.elementRef.nativeElement.contains(event.target);
    // console.log(event.path[0].classList[0].startsWith('dz'));
  }

  ngOnInit() {
  }

/*******************Raju*********************/

  /* Open Default text area */
  openDefaultTextField(){
    $('#default_textfield_div').toggle();
    if($('#default_textfield_div').css('display') == 'block'){
      tinymce.init({
        menubar:false,
        statusbar: false,
        paste_text_sticky : true,
        selector: '.text_area_plugin',
        plugins: ['colorpicker textcolor'],
        skin_url: 'assets/skins/lightgray',
        toolbar: "fontselect |  fontsizeselect | bold italic | alignleft aligncenter alignright | forecolor | bullist numlist",
        font_formats : "Arial=arial,helvetica,sans-serif;"+"Book Antiqua=book antiqua,palatino;"+ "Courier New=courier new,courier;"+"Georgia=georgia,palatino;"+"Helvetica=helvetica;",
        toolbar_items_size: 'small',
        height: "80",
      });
    }
  }

  /* Cancel default text field */
  cancelDefaultText(){
    $('#default_textfield_div').attr('style','display:none');
  }

  /* Save Default text field */
  saveDefaultText(){
    $('#default_text_area').empty();
    if(tinymce.get('default_text_area')){
      var content = tinymce.get('default_text_area').getContent();
      if($.trim(content)==''){
        $('#default_text_area').html('Text field should not be empty');
      }else{
        this.default_text=this.sanitizer.bypassSecurityTrustHtml(content);
        $('#default_textfield_div').attr('style','display:none');
      }
    }
  }

  /* Add Panel with respect to ID*/
  addPanel(id){
    $('#panel_'+id).toggle();
  }

  /* Open Text Field with respect to ID */
  editText(index_value,action_type){
    $('#textfield_'+index_value).toggle();
    if($('#textfield_'+index_value).css('display') == 'block'){
      tinymce.init({
        menubar:false,
        statusbar: false,
        paste_text_sticky : true,
        selector: '.text_area_plugin',
        plugins: ['colorpicker textcolor'],
        skin_url: 'assets/skins/lightgray',
        toolbar: "fontselect |  fontsizeselect | bold italic | alignleft aligncenter alignright | forecolor | bullist numlist",
        font_formats : "Arial=arial,helvetica,sans-serif;"+"Book Antiqua=book antiqua,palatino;"+ "Courier New=courier new,courier;"+"Georgia=georgia,palatino;"+"Helvetica=helvetica;",
        toolbar_items_size: 'small',
        height: "80",
      });
    }

    for (var i=tinymce.editors.length-1; i>-1; i--) {
      var ed_id = tinymce.editors[i].id;
      if(ed_id!='text_area_element_'+index_value){
        var open_div_test=ed_id.split("_");
        if(open_div_test[open_div_test.length-1]!='area'){
          tinymce.get(ed_id).setContent('');
          $('#textfield_'+open_div_test[open_div_test.length-1]).attr('style','display:none');
          tinymce.execCommand("mceRemoveEditor", true, ed_id);
        }
      }
    }

    if(typeof this.listenFunc=='function'){
      this.listenFunc();
    }
    
    if(action_type=='edit'){
      if(typeof this.multiple_items[index_value].text_data.changingThisBreaksApplicationSecurity!='undefined'){
        var text_content=$('#textfield_'+index_value+'_showtext_append').html();
        tinymce.get('text_area_element_'+index_value).setContent(text_content);
        let element=document.getElementById('button_save_text_'+index_value);
        this.listenFunc =this.renderer.listen(element, 'click', (e)=>{
          e.stopImmediatePropagation();
          this.saveText(index_value,'edit');
        });
      } 
    }else{
      let element=document.getElementById('button_save_text_'+index_value);
      this.listenFunc = this.renderer.listen(element, 'click', (e)=>{
        e.stopImmediatePropagation();
        this.saveText(index_value,'');
      });
    }
  }

  /* Cancel Text Editor */
  cancelOpenTextEditor(index_value){
    tinymce.execCommand("mceRemoveEditor", true, 'text_area_element_'+index_value);
    $('#textfield_'+index_value).attr('style','display:none');
  }


  /* Save Text editor value */
  saveText(index_value,action_type){
    if(tinymce.get('text_area_element_'+index_value)){
      var content = tinymce.get('text_area_element_'+index_value).getContent();
      $("#text_area_element_"+index_value+"_error").empty();
      if($.trim(content)==''){
        $("#text_area_element_"+index_value+"_error").html('Text field should not be empty');
      }else{
        this.listenFunc();
        if(action_type=='edit'){
          this.multiple_items.splice(index_value, 1);
          this.multiple_items.splice(index_value, 0, {type:'text_file',text_data:this.sanitizer.bypassSecurityTrustHtml(content)});
        }else{
          if(index_value =='first'){
            this.multiple_items.push({type:'text_file',text_data:this.sanitizer.bypassSecurityTrustHtml(content)});
          }else{
            this.multiple_items.splice(index_value, 0, {type:'text_file',text_data:this.sanitizer.bypassSecurityTrustHtml(content)});
          }
        }
        tinymce.get('text_area_element_'+index_value).setContent('');
        tinymce.execCommand("mceRemoveEditor", true, 'text_area_element_'+index_value);
        $("#textfield_"+index_value).attr('style','display:none'); 
        $('#panel_'+index_value).attr('style','display:none');
      }
    }
  }

  /* Upload Image file */
  uploadImage(index_value){
    $('#main_file').val('');
    $('#main_file').attr('accept','.jpg,.png,.jpeg');
    $('#main_file').off('change').on('change', e => {
      this.saveAllFiles(index_value,'image');
    });
    $("#main_file").click();
  }

  /* Upload Video file */
  uploadVideo(index_value){
    $('#main_file').val('');
    $('#main_file').attr('accept','.mp4,.WebM,.Ogg');
    $('#main_file').off('change').on('change', e => {
      this.saveAllFiles(index_value,'video');
    });
    $("#main_file").click();
  }

  /* Upload PDF file */
  uploadPdf(index_value){
    $('#main_file').val('');
    $('#main_file').attr('accept','.pdf');
    $('#main_file').off('change').on('change', e => {
      this.saveAllFiles(index_value,'pdf');
    });
    $("#main_file").click();
  }

  /* Save image, video, pdf files */
  saveAllFiles(index_value,type_sent){
    var check_details=this.checkFileExtenstion(type_sent);
    var file_data=$('#main_file').prop('files')[0];
    if(check_details){
      if(type_sent=='image' || type_sent=='video'){
        var reader = new FileReader();
        reader.readAsDataURL($('#main_file').prop('files')[0]);
        reader.onload = ()=>{
          var dataURL:any;
          dataURL = reader.result;
          if(type_sent=='image'){
            if(index_value =='first'){
              this.multiple_items.push({type:'image_file',image_file:file_data,image_src:dataURL});
            }else{
              this.multiple_items.splice(index_value, 0, {type:'image_file',image_file:file_data,image_src:dataURL});
            }
          }else if(type_sent=='video'){
            if(index_value =='first'){
              this.multiple_items.push({type:'video_file',video_file:file_data,video_src:dataURL});
            }else{
              this.multiple_items.splice(index_value, 0, {type:'video_file',video_file:file_data,video_src:dataURL});
            }
          }
        };
      }else if(type_sent=='pdf'){
        if(index_value =='first'){
          this.multiple_items.push({type:'pdf_file',pdf_file:file_data,pdf_src:URL.createObjectURL($('#main_file').prop('files')[0])});
          this.showPDF(URL.createObjectURL($('#main_file').prop('files')[0]),index_value);
        }else{
          this.multiple_items.splice(index_value, 0, {type:'pdf_file',pdf_file:file_data,pdf_src:URL.createObjectURL($('#main_file').prop('files')[0])});
          this.showPDF(URL.createObjectURL($('#main_file').prop('files')[0]),index_value);
        }
      }else{
        alert('something went wrong');
      }
      $('#main_file').val('');
      $('#panel_'+index_value).attr('style','display:none');
    }
  }

  /* checking extension type for all types */
  checkFileExtenstion(type_data){
    // return true;
    if($('#main_file').prop('files')[0]!==undefined && $('#main_file').prop('files')[0]!==''){
      var file_data = $('#main_file').prop('files')[0];
      if(file_data!=undefined && file_data!=''){
        var ext = file_data.name.toLowerCase().split(".");
        ext = ext[ext.length-1].toLowerCase();
        var arrayExtensions,ext_type1,ext_type2,ext_type3;
        if(type_data=='image'){
          arrayExtensions = ["jpg","jpeg","png"];
          ext_type1='image/jpeg';
          ext_type2='image/png';
          ext_type3='image/jpg';
        }else if(type_data=='video'){
          arrayExtensions = ["mp4" , "WebM","Ogg"];
          ext_type1='video/mp4';
          ext_type2='video/WebM';
          ext_type3='video/Ogg';
        }else if(type_data=='pdf'){
          arrayExtensions = ["pdf"];
          ext_type1='application/pdf';
        }else{
          alert('Something went wrong');
        }
        if(file_data.type == ext_type1 || file_data.type == ext_type2 || file_data.type == ext_type3){
          if(file_data.size<2048000){
            return true;
          }else{
            alert("Size should be less than 2MB.");
            $("#main_file").val('');
          }
        }else if(arrayExtensions.lastIndexOf(ext) == -1){
          alert("Wrong extension type.");
          $("#main_file").val('');
        }else{
          alert("Wrong extension type.");
          $("#main_file").val('');
        }
      }
    }
  }

  /* Render PDF file */
  showPDF(pdf_url,pdf_number){
    if(pdf_number=='first'){
      pdf_number=this.multiple_items.length-1;
      $('#pdf_display').empty();
      $('#pdf_display').html('<div id="pdf_display_'+pdf_number+'_div" class="row" style="display:none"><div class="col-sm-12"><div class="col-sm-12" style="padding:5px 10%;">\n\
                              <div class="pdf_loader" id="pdf_loader_'+pdf_number+'">Loading document ...</div><div class="pdf_contents" id="pdf_contents+'+pdf_number+'">\n\
                              <div class="pdf_meta" id="pdf_meta_'+pdf_number+'"><div class="pdf_buttons" id="pdf_buttons_'+pdf_number+'">\n\
                              <button class="pdf_prev" id="pdf_prev_'+pdf_number+'">Previous</button>\n\
                              <button class="pdf_next" id="pdf_next_'+pdf_number+'">Next</button></div>\n\
                              <div class="page_count_container" id="page_count_container_'+pdf_number+'">Page <div id="pdf_current_page_'+pdf_number+'"></div> of <div id="pdf_total_pages_'+pdf_number+'"></div></div>\n\
                              </div><div class="row"><div class="col-sm-12"><canvas class="pdf_canvas" id="pdf_canvas_'+pdf_number+'" style="width: 100%;" height="917" width="649">\n\
                              </canvas><span style="cursor:pointer"><img class="upper_right" src="assets/images/ico_close_neg_shadow.png" /></span>\n\
                              </div></div><div class="page_loader" id="page_loader_'+pdf_number+'">Loading page ...</div>\n\
                              </div></div></div></div>');
    }
    $("#page_loader_"+pdf_number).show();
    PDFJS.getDocument({ url:pdf_url }).then((pdf_doc)=> {
      this.__PDF_DOC = pdf_doc;
      this.__TOTAL_PAGES = this.__PDF_DOC.numPages;
      this.__CANVAS = $("#pdf_canvas_"+pdf_number).get(0);
      this.__CANVAS_CTX = this.__CANVAS.getContext('2d');
      $("#page_loader_"+pdf_number).hide();
      $("#pdf_contents_"+pdf_number).show();
      $("#pdf_total_pages_"+pdf_number).text(this.__TOTAL_PAGES);
      this.showPage(1,pdf_number);
    }).catch(function(error) {
      $("#page_loader_"+pdf_number).hide();
      alert(error.message);
    });
  }
  
  /* show PDF page */  
  showPage(page_no,pdf_number){
    this.__PAGE_RENDERING_IN_PROGRESS = 1;
    this.__CURRENT_PAGE = page_no;
    $("#pdf_next_"+pdf_number, "#pdf_prev_"+pdf_number).attr('disabled', 'disabled');
    $("#pdf_canvas_"+pdf_number).hide();
    $("#page_loader_"+pdf_number).show();
    $("#download_image_"+pdf_number).hide();
    $("#pdf_current_page_"+pdf_number).text(page_no);
    this.__PDF_DOC.getPage(page_no).then((page)=> {
      var scale_required = this.__CANVAS.width / page.getViewport(1).width;
      var viewport = page.getViewport(scale_required);
      this.__CANVAS.height = viewport.height;
      var renderContext = {
        canvasContext: this.__CANVAS_CTX,
        viewport: viewport
      };
      page.render(renderContext).then(()=> {
        this.__PAGE_RENDERING_IN_PROGRESS = 0;
        $("#pdf_next_"+pdf_number, "#pdf_prev_"+pdf_number).removeAttr('disabled');
        $("#pdf_canvas_"+pdf_number).show();
        $("#page_loader_"+pdf_number).hide();
        $("#pdf_loader_"+pdf_number).hide();
        $("#download_image_"+pdf_number).show();
        $('#pdf_display').empty();
      });
    }).catch((e)=> {
      console.log(e); 
    });
  }

  /* show previous page */  
  previousPage(index_value){
    if(this.__CURRENT_PAGE != 1)
        this.showPage(--this.__CURRENT_PAGE,index_value);
  }

  /* show next page */
  nextPage(index_value){
    if(this.__CURRENT_PAGE != this.__TOTAL_PAGES)
        this.showPage(++this.__CURRENT_PAGE,index_value);
  }

  /* Popup open for delete confirmation */
  openDeleteConfirmationPopup(index_value){
    this.delete_index_value=index_value;
    this.delete_multiple_items_popup=true;
  }
  
  /* Popup cancel for delete confirmation */
  closeDeletePopupElement(){
    this.delete_index_value;
    this.delete_multiple_items_popup=false;
  }

  /* Delete added image,pdf,text,video items */
  deleteMultipleItems(index_value){
    this.multiple_items.splice(index_value, 1);
    this.delete_multiple_items_popup=false;
  }

  /* Create Learning tag pop-up open */
  openCreateLearningTagPopup(){
    $('#learning_tag_name').val('')
    $('#learning_tag_description').val('');
    $('#learning_tag_name_error').empty();
    $('#learning_tag_description_error').empty();
    $('#duplicate_learning_tag_error').empty();
    $('#create_learning_tag_popup_div').attr('style','display:block');
  }

  /* Create Learning tag pop-up close */
  closeCreateLearningTagPopup(){
    $('#learning_tag_name').val('')
    $('#learning_tag_description').val('');
    $('#create_learning_tag_popup_div').attr('style','display:none');
  }

  /* Save Learning Tags*/
  saveLearningTags(){
    var learning_tag_name=$.trim($('#learning_tag_name').val()),
        learning_tag_description=$.trim($('#learning_tag_description').val());
    $('#learning_tag_name_error').empty();
    $('#learning_tag_description_error').empty();
    $('#duplicate_learning_tag_error').empty();
    if(learning_tag_name==''){
      $('#learning_tag_name_error').html('Tag name is required');
      return false;
    }else if(learning_tag_description==''){
      $('#learning_tag_description_error').html('Tag description is required');
      return false;
    }
    var array_check=this.learning_tags.filter((tags)=> { return tags.learning_tag_name == learning_tag_name });
    if(array_check.length==0){
      this.learning_tags.push({learning_tag_name:learning_tag_name,learning_tag_description:learning_tag_description,selected_learning_status:false});
      $('#create_learning_tag_popup_div').attr('style','display:none');
    }else{
      $('#duplicate_learning_tag_error').html('Same learning tag present, please choose different name');
    }
  }

  /* Remove Created Learning Tags */
  removeCreatedLearningTag(index_value){
    this.learning_tags.splice(index_value, 1);
  }

  /* Select learning tags from the list */
  selectLearningTags(index_value){
    this.learning_tags[index_value].selected_learning_status=true;
  }

  /* Remove Selected tags from the list */
  removeSelectedTagName(index_value){
    this.learning_tags[index_value].selected_learning_status=false;
  }

  /* After View Init */
  async ngAfterViewInit() {
    await this.loadScript('./assets/plugins/pdfview/pdf.js');
    await this.loadScript('./assets/plugins/pdfview/pdf.worker.js');
  } 
  
  /* Loading script files function */
  private loadScript(scriptUrl: string) {
    return new Promise((resolve, reject) => {
    const scriptElement = document.createElement('script');
    scriptElement.src = scriptUrl;
    scriptElement.onload = resolve;
    document.body.appendChild(scriptElement);
   })
  }
    
  /* destroy method */
  ngOnDestroy() {
    if(tinymce){
      tinymce.remove();
    }
    if(this.listenFunc()){
      this.listenFunc();
    }
  }

}
