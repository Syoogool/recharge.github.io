/* global $ */
$(function () {
  $(document).on('click', '.nav-item', clickNav)
    .on('click', '.j-m-undel', unDelete)
    .on('click', '.j-m-close', unDelete)
    .on('click', '.js-unchecked-show', uncheckedShow)
    .on('click', '.js-unchecked-hide', uncheckedHide)
    .on('click', '.js-checked-cancelShow', checkedCancelShow)
    .on('click', '.js-unchecked', render)
    .on('click', '.js-checked-show', render)
    .on('click', '.js-checked-hide', render);

  // alipay
  $('#alipay').on('click', '.filter-box a', filter)
    .on('click', '.j-btn-edit', clickEdit)
    .on('click', '.btn-all-select', clickAllSelect)
    .on('click', '.btn-checkbox', clickCheckbox)
    .on('click', '.j-delete', aliDialog);

  // service provider
  $('#serv').on('click', '.filter-box a', filter)
    .on('click', '.j-btn-edit', clickEdit)
    .on('click', '.btn-all-select', clickAllSelect)
    .on('click', '.btn-checkbox', clickCheckbox)
    .on('click', '.j-delete', servDialog);

  // wechat
  $('#wechat').on('click', '.filter-box a', filter)
    .on('click', '.j-btn-edit', clickEdit)
    .on('click', '.btn-all-select', clickAllSelect)
    .on('click', '.btn-checkbox', clickCheckbox)
    .on('click', '.j-delete', wehDialog);

  // 初始化加载数据
  $('.js-unchecked').trigger('click');

  function clickNav () {
    var $index = $('.nav-item').index(this);
    $('.nav-item a').removeClass('active');
    $(this).find('a').addClass('active');
    $('.content').eq($index).show()
                 .siblings().hide();
  }

  function filter () {
    // 同上面的方式有差异
    var $index = $('.filter-box a').index(this);
    $(this).addClass('active')
          .siblings().removeClass('active');
    $('.form').eq($index).show()
              .siblings().hide();
  }

  //  点击编辑按钮
  function clickEdit () {
    $(this).hide().siblings().show();
    $(this).parents('.filter').siblings('.check-h-msg').find('.btn-show').hide();
    $(this).parents('.filter').siblings('.check-h-msg').find('.btn-delete').hide();
    $(this).parents('.filter').siblings('.check-h-msg').find('.btn-checkbox').show();
  }

  // 全选
  function clickAllSelect () {
    $(this).parents('.filter').siblings('.check-h-msg').find('.init-checkbox').toggle();
    $(this).parents('.filter').siblings('.check-h-msg').find('.checkbox-img').toggle();
  }

  // 复选框是否选中状态效果
  function clickCheckbox () {
    if ($(this).parents('.leave-msg').siblings().find('.btn-checkbox').hasClass('checked') ) {
      console.log('true')
    }
    if ($(this).find('.init-checkbox').is(':hidden')) {
      $(this).find('.init-checkbox').show();
      $(this).find('.checkbox-img').hide();
      $(this).removeClass('checked');
    } else {
      $(this).find('.init-checkbox').hide();
      $(this).find('.checkbox-img').show();
      $(this).addClass('checked');
    }
  }

  // 未审批部分
  function uncheckedShow () {
    $(this).parents('.leave-msg').hide();
  }
  function uncheckedHide () {
    $(this).parents('.leave-msg').hide();
  }

  // 审批显示部分
  function checkedCancelShow () {
    $(this).parents('.leave-msg').hide();
  }

  var alipayURI = 'json/alipay.json',
    servURI = 'json/serv.json',
    wechatURI = 'json/wechat.json';

  function render () {
    var $channel = $(this).parent().parent().attr('id');
    var tpl = $.trim($(this).attr('class').replace(/active/, '').slice(3));
    var $url = 'json/' + $channel + '.json';
    var $id = $channel + '-' + tpl;

    $.getJSON($url, function (data) {
      var html = template(tpl, data);
      document.getElementById($id).innerHTML = html;
    });
  }


  function aliDialog () {
    $('#jAliDialog').show();
    // 禁止滚动条
    // $(document.body).css({
    //   "overflow-x":"hidden",
    //   "overflow-y":"hidden"
    // })
    $(document.body).toggleClass('html-body-overflow');
  }
  function servDialog () {
    $('#jServDialog').show();
  }
  function wehDialog () {
    $('#jWehDialog').show();
  }

  function unDelete () {
    $('.modal-overlay-box').hide();
    $(document.body).toggleClass('html-body-overflow');
  }

});
