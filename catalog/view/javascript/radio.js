$(function(){
	
	
	$(document).on("change",".radio input[type=checkbox]",function(){

		var $this = $(this);
		var $lab = $this.parent();
		var check_box = $lab.hasClass('checkbox');
		var select_box = $lab.hasClass('select');
		
		var $ul = $lab.parent().parent();

		if(check_box == true){
			if($this.is(":checked")){	
				$this.parent().addClass('checked');	
			}else{
				$this.parent().removeClass('checked');
			}
			
		}
		else{
			$ul.find(".radio input[type=checkbox]").attr('checked',false).parent().removeClass('checked');
			$this.attr('checked',true).parent().addClass('checked');	
		}
		
		if(select_box == true){
			
			var selected = $lab.hasClass('selected');
			
			$ul.find(".radio.select").removeClass('selected');
			
			var vals = $this.attr('data-values').split(",");
			var now_val = $this.val();
			var new_val = $this.val();
			
			for(var i = 0; i < vals.length ; i++ ){

				if( vals[i] == now_val && selected){
					new_val = (vals[i+1])?vals[i+1]:vals[0];	
					
				}
				
					$lab.removeClass(new_val);
			}
			
				
					$this.val(new_val);
					$lab.addClass(new_val).addClass('selected');
					
					$("#flag").val($this.attr('name')+'.'+$this.val()).change();
					
		}
	});
});