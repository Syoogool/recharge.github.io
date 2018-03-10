/* global $ */
(function () {
  // 新建商品弹出框
  var operate = {
    init: function () {
      this.addProduct();
      this.del();
    },
    addProduct: function () {
      $('.js-add-product').click(function () {
        $('#modal').show();
        //  $platform作为平台的标记并传给模态框的确认按钮作为作用域的判断依据
        var $platform = $(this).attr('data-platform');
        $('#j-confirm').attr('data-platform', $platform);
        console.log($platform);

        // 禁止垂直滚动条出现
        $(document.body).css({'overflow-y': 'hidden'});
      });
    },

    del: function () {
      $('#j-del').click(function () {
        console.log(999);
        $(this).parents('tr').remove();
      });
    }
  };

  // 下拉选择框
  var selectBox = {
    init: function () {
      $(document).on('click', '.select', this.clickSelect)
        .on('click', '.triangle', this.clickSelect)
        .on('click', '.option', this.clickOption)
        .on('click', '.nav a', this.clickNav)
        .on('click', '#j-close', this.closeModal)
        .on('mouseover', '.option', this.slideIn)
        .on('mouseout', '.option', this.slideOut);
    },

    clickSelect: function (e) {
      $(this).parent().siblings().find('.option-box').hide();
      $(this).siblings('.option-box').toggle();
      $(document).one('click', function () {
        $('.option-box').hide();
      });
      e.stopPropagation();
    },

    clickOption: function () {
      // 当前选中选值
      var $curValue = $(this).text();
      var $element = $(this).parents('.select-tab').siblings('.table').find('.on-shelf');
      $(this).addClass('selected').siblings().removeClass('selected');
      $(this).parent().siblings('.select').val($curValue);
      $(this).parent().hide();

      // 事件
      if ($curValue === '上架') {
        $element.show().parent().siblings().hide();
      } else if ($curValue === '下架') {
        $element.hide().parent().siblings().show();
      } else {}
    },

    clickNav: function () {
      var $nav = $('.nav a');
      var i = $nav.index(this);

      $nav.removeClass('active');
      $(this).addClass('active');
      $('.content').eq(i).show().siblings().hide();
    },

    closeModal: function () {
      $('#modal').hide();

      // 关闭模态框滚动条出现
      $(document.body).css({'overflow-y': 'auto'});
    },

    slideIn: function () {
      $(this).addClass('hover').siblings().removeClass('hover');
      $(this).parent().siblings('.select').addClass('select-hover');
    },

    slideOut: function () {
      $(this).parent().siblings('.select').removeClass('select-hover');
    }
  };

  // 新增商品
  var addProduct = {
    init: function () {
      this.selectProductType();
      this.confirm();
    },

    // 选择商品类型
    selectProductType: function () {
      $('#type span').click(function () {
        var $this = $(this);
        if ($this.hasClass('active')) {
          $this.removeClass('active');
        } else {
          $this.siblings().removeClass('active');
          $this.addClass('active');
        }
      });
    },

    // 确认新增商品
    confirm: function () {
      $('#j-confirm').click(function (e) {
        // $platform作为判断添加哪个渠道的商品的判断依据
        var $platform = $(this).attr('data-platform');

        var $orderNum = $('#' + $platform).find('tbody tr').length + 1;
        var $id = $('#id').val(),
          $type = $('#type .active').text(),
          $area = $('#area input').val(),
          $price = $('#price input').val();

        console.log($platform, $id, $type,$area,$price);

        var html = '<tr>' +
          ' <td> ' + $orderNum + '</td>' + '<td>' + $id + ' </td>' + '<td>' + $type + ' </td>' + '<td>' + $area + ' </td>' + '<td>' + $price + ' </td>' + '<td class="td-operate">' + '<div><span>下架</span></div>' + '<div><span class="delete">删除</span></div>' + '</td>' + '</tr>';


        // 每个渠道都有不同的id
        $('#' + $platform).find('tbody').append(html);
        $('#modal').hide();

        // 提交的数据
        var $form = $('#modal').find('.shop-form')[0];
        var res = $($form).serialize();
        console.log($form, res);


        // 关闭模态框滚动条出现
        $(document.body).css({'overflow-y': 'auto'});

        // 阻止表单提交默认行为
        e.preventDefault();
      });
    }
  };

  var query = {
    init: function () {
      $('.js-province').on('click', 'li', this.queryProvince);
      $('.js-price').on('click', 'li', this.queryPrice);
    // $(".js-operate").on("click", 'li', filterOperate)
    },

    queryProvince: function () {
      var $target = $(this).parents('.select-tab').siblings('.table').find('tbody tr');
      var $tr = $('.table tr');
      var query = $(this).text();

      // 下一次操作之前恢复表格的所有数据
      $tr.show();
      $target.filter(function (index) {
        // 这个表达式浪费了太多时间
        return $($target[index]).children().eq(3).text() !== query;
      }).hide();
    },

    queryPrice: function () {
      var $target = $(this).parents('.select-tab').siblings('.table').find('tbody tr');
      var $tr = $('.table tr');
      var query = $(this).text();

      // 下一次操作之前恢复表格的所有数据
      $tr.show();
      $target.filter(function (index) {
        // 这个表达式浪费了太多时间
        return $($target[index]).children().eq(4).text() !== query;
      }).hide();
    }
  };

  operate.init();
  selectBox.init();
  addProduct.init();
  query.init();
})();
