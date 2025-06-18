<template>
  <el-tabs size="mini" class="specific_symbol_tabs">
    <el-tab-pane label="钢筋符号">
      <div class="sspanel" style="font-size: 20px;">
        <table width="100%" class="specific_symbol_table">
          <tr>
            <td class="specific_symbol_hand" @click="select('<span style=\'font-family:SJQY\'>A</span>')"><span style='font-family:SJQY'>A</span></td>
            <td class="specific_symbol_hand" @click="select('<span style=\'font-family:SJQY\'>B</span>')"><span style='font-family:SJQY'>B</span></td>
            <td class="specific_symbol_hand" @click="select('<span style=\'font-family:SJQY\'>C</span>')"><span style='font-family:SJQY'>C</span></td>
            <td class="specific_symbol_hand" @click="select('<span style=\'font-family:SJQY\'>D</span>')"><span style='font-family:SJQY'>D</span></td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
        </table>
      </div>
    </el-tab-pane>
    <el-tab-pane label="带圈数字">
      <div class="sspanel" style="font-size: 18px;">
        <table width="100%" class="specific_symbol_table">
          <tr>
            <td class="specific_symbol_hand" @click="select('⓪')">⓪</td>
            <td class="specific_symbol_hand" @click="select('①')">①</td>
            <td class="specific_symbol_hand" @click="select('②')">②</td>
            <td class="specific_symbol_hand" @click="select('③')">③</td>
            <td class="specific_symbol_hand" @click="select('④')">④</td>
            <td class="specific_symbol_hand" @click="select('⑤')">⑤</td>
            <td class="specific_symbol_hand" @click="select('⑥')">⑥</td>
            <td class="specific_symbol_hand" @click="select('⑦')">⑦</td>
            <td class="specific_symbol_hand" @click="select('⑧')">⑧</td>
            <td class="specific_symbol_hand" @click="select('⑨')">⑨</td>
          </tr>
          <tr>
            <td class="specific_symbol_hand" @click="select('⑩')">⑩</td>
            <td class="specific_symbol_hand" @click="select('⑪')">⑪</td>
            <td class="specific_symbol_hand" @click="select('⑫')">⑫</td>
            <td class="specific_symbol_hand" @click="select('⑬')">⑬</td>
            <td class="specific_symbol_hand" @click="select('⑭')">⑭</td>
            <td class="specific_symbol_hand" @click="select('⑮')">⑮</td>
            <td class="specific_symbol_hand" @click="select('⑯')">⑯</td>
            <td class="specific_symbol_hand" @click="select('⑰')">⑰</td>
            <td class="specific_symbol_hand" @click="select('⑱')">⑱</td>
            <td class="specific_symbol_hand" @click="select('⑲')">⑲</td>
          </tr>
          <tr>
            <td class="specific_symbol_hand" @click="select('⑳')">⑳</td>
            <td class="specific_symbol_hand" @click="select('㉑')">㉑</td>
            <td class="specific_symbol_hand" @click="select('㉒')">㉒</td>
            <td class="specific_symbol_hand" @click="select('㉓')">㉓</td>
            <td class="specific_symbol_hand" @click="select('㉔')">㉔</td>
            <td class="specific_symbol_hand" @click="select('㉕')">㉕</td>
            <td class="specific_symbol_hand" @click="select('㉖')">㉖</td>
            <td class="specific_symbol_hand" @click="select('㉗')">㉗</td>
            <td class="specific_symbol_hand" @click="select('㉘')">㉘</td>
            <td class="specific_symbol_hand" @click="select('㉙')">㉙</td>
          </tr>
          <tr>
            <td class="specific_symbol_hand" @click="select('㉚')">㉚</td>
            <td class="specific_symbol_hand" @click="select('㉛')">㉛</td>
            <td class="specific_symbol_hand" @click="select('㉜')">㉜</td>
            <td class="specific_symbol_hand" @click="select('㉝')">㉝</td>
            <td class="specific_symbol_hand" @click="select('㉞')">㉞</td>
            <td class="specific_symbol_hand" @click="select('㉟')">㉟</td>
            <td class="specific_symbol_hand" @click="select('㊱')">㊱</td>
            <td class="specific_symbol_hand" @click="select('㊲')">㊲</td>
            <td class="specific_symbol_hand" @click="select('㊳')">㊳</td>
            <td class="specific_symbol_hand" @click="select('㊴')">㊴</td>
          </tr>
          <tr>
            <td class="specific_symbol_hand" @click="select('㊵')">㊵</td>
            <td class="specific_symbol_hand" @click="select('㊶')">㊶</td>
            <td class="specific_symbol_hand" @click="select('㊷')">㊷</td>
            <td class="specific_symbol_hand" @click="select('㊸')">㊸</td>
            <td class="specific_symbol_hand" @click="select('㊹')">㊹</td>
            <td class="specific_symbol_hand" @click="select('㊺')">㊺</td>
            <td class="specific_symbol_hand" @click="select('㊻')">㊻</td>
            <td class="specific_symbol_hand" @click="select('㊼')">㊼</td>
            <td class="specific_symbol_hand" @click="select('㊽')">㊽</td>
            <td class="specific_symbol_hand" @click="select('㊾')">㊾</td>
          </tr>
          <tr>
            <td class="specific_symbol_hand" @click="select('㊿')">㊿</td>
            <td class="specific_symbol_hand" @click="select('<span style=\'font-family:SJQY\'>K</span>')"><span style='font-family:SJQY'>K</span></td>
            <td class="specific_symbol_hand" @click="select('<span style=\'font-family:SJQY\'>L</span>')"><span style='font-family:SJQY'>L</span></td>
            <td class="specific_symbol_hand" @click="select('<span style=\'font-family:SJQY\'>M</span>')"><span style='font-family:SJQY'>M</span></td>
            <td class="specific_symbol_hand" @click="select('<span style=\'font-family:SJQY\'>N</span>')"><span style='font-family:SJQY'>N</span></td>
            <td class="specific_symbol_hand" @click="select('<span style=\'font-family:SJQY\'>O</span>')"><span style='font-family:SJQY'>O</span></td>
            <td class="specific_symbol_hand" @click="select('<span style=\'font-family:SJQY\'>P</span>')"><span style='font-family:SJQY'>P</span></td>
            <td class="specific_symbol_hand" @click="select('<span style=\'font-family:SJQY\'>Q</span>')"><span style='font-family:SJQY'>Q</span></td>
            <td class="specific_symbol_hand" @click="select('<span style=\'font-family:SJQY\'>R</span>')"><span style='font-family:SJQY'>R</span></td>
            <td class="specific_symbol_hand" @click="select('<span style=\'font-family:SJQY\'>S</span>')"><span style='font-family:SJQY'>S</span></td>    
          </tr>
          <tr>
            <td class="specific_symbol_hand" @click="select('<span style=\'font-family:SJQY\'>T</span>')"><span style='font-family:SJQY'>T</span></td>
            <td class="specific_symbol_hand" @click="select('<span style=\'font-family:SJQY\'>U</span>')"><span style='font-family:SJQY'>U</span></td>
            <td class="specific_symbol_hand" @click="select('<span style=\'font-family:SJQY\'>V</span>')"><span style='font-family:SJQY'>V</span></td>
            <td class="specific_symbol_hand" @click="select('<span style=\'font-family:SJQY\'>W</span>')"><span style='font-family:SJQY'>W</span></td>
            <td class="specific_symbol_hand" @click="select('<span style=\'font-family:SJQY\'>X</span>')"><span style='font-family:SJQY'>X</span></td>
            <td class="specific_symbol_hand" @click="select('<span style=\'font-family:SJQY\'>Y</span>')"><span style='font-family:SJQY'>Y</span></td>
            <td class="specific_symbol_hand" @click="select('<span style=\'font-family:SJQY\'>Z</span>')"><span style='font-family:SJQY'>Z</span></td>
            <td class="specific_symbol_hand" @click="select('<span style=\'font-family:SJQY\'>I</span>')"><span style='font-family:SJQY'>I</span></td> 
            <td class="specific_symbol_hand" @click="select('<span style=\'font-family:SJQY\'>]</span>')"><span style='font-family:SJQY'>]</span></td>
            <td class="specific_symbol_hand" @click="select('<span style=\'font-family:SJQY\'>H</span>')"><span style='font-family:SJQY'>H</span></td>    
          </tr>
          <tr>
            <td class="specific_symbol_hand" @click="select('<span style=\'font-family:SJQY\'>_</span>')"><span style='font-family:SJQY'>_</span></td>
            <td class="specific_symbol_hand" @click="select('<span style=\'font-family:SJQY\'>a</span>')"><span style='font-family:SJQY'>a</span></td>
            <td class="specific_symbol_hand" @click="select('<span style=\'font-family:SJQY\'>b</span>')"><span style='font-family:SJQY'>b</span></td>
            <td class="specific_symbol_hand" @click="select('<span style=\'font-family:SJQY\'>c</span>')"><span style='font-family:SJQY'>c</span></td>
            <td class="specific_symbol_hand" @click="select('<span style=\'font-family:SJQY\'>d</span>')"><span style='font-family:SJQY'>d</span></td>
            <td class="specific_symbol_hand" @click="select('<span style=\'font-family:SJQY\'>e</span>')"><span style='font-family:SJQY'>e</span></td>
            <td class="specific_symbol_hand" @click="select('<span style=\'font-family:SJQY\'>f</span>')"><span style='font-family:SJQY'>f</span></td>
            <td class="specific_symbol_hand" @click="select('<span style=\'font-family:SJQY\'>g</span>')"><span style='font-family:SJQY'>g</span></td>
            <td class="specific_symbol_hand" @click="select('<span style=\'font-family:SJQY\'>h</span>')"><span style='font-family:SJQY'>h</span></td>
            <td class="specific_symbol_hand" @click="select('<span style=\'font-family:SJQY\'>i</span>')"><span style='font-family:SJQY'>i</span></td>    
          </tr>
          <tr>
            <td class="specific_symbol_hand" @click="select('<span style=\'font-family:SJQY\'>j</span>')"><span style='font-family:SJQY'>j</span></td>
            <td class="specific_symbol_hand" @click="select('<span style=\'font-family:SJQY\'>k</span>')"><span style='font-family:SJQY'>k</span></td>
            <td class="specific_symbol_hand" @click="select('<span style=\'font-family:SJQY\'>l</span>')"><span style='font-family:SJQY'>l</span></td>
            <td class="specific_symbol_hand" @click="select('<span style=\'font-family:SJQY\'>m</span>')"><span style='font-family:SJQY'>m</span></td>
            <td class="specific_symbol_hand" @click="select('<span style=\'font-family:SJQY\'>n</span>')"><span style='font-family:SJQY'>n</span></td>
            <td class="specific_symbol_hand" @click="select('<span style=\'font-family:SJQY\'>o</span>')"><span style='font-family:SJQY'>o</span></td>
            <td class="specific_symbol_hand" @click="select('<span style=\'font-family:SJQY\'>p</span>')"><span style='font-family:SJQY'>p</span></td>
            <td class="specific_symbol_hand" @click="select('<span style=\'font-family:SJQY\'>q</span>')"><span style='font-family:SJQY'>q</span></td>
            <td class="specific_symbol_hand" @click="select('<span style=\'font-family:SJQY\'>r</span>')"><span style='font-family:SJQY'>r</span></td>
            <td class="specific_symbol_hand" @click="select('<span style=\'font-family:SJQY\'>s</span>')"><span style='font-family:SJQY'>s</span></td>    
          </tr>
          <tr>
            <td class="specific_symbol_hand" @click="select('<span style=\'font-family:SJQY\'>t</span>')"><span style='font-family:SJQY'>t</span></td>
            <td class="specific_symbol_hand" @click="select('<span style=\'font-family:SJQY\'>u</span>')"><span style='font-family:SJQY'>u</span></td>
            <td class="specific_symbol_hand" @click="select('<span style=\'font-family:SJQY\'>v</span>')"><span style='font-family:SJQY'>v</span></td>
            <td class="specific_symbol_hand" @click="select('<span style=\'font-family:SJQY\'>w</span>')"><span style='font-family:SJQY'>w</span></td>
            <td class="specific_symbol_hand" @click="select('<span style=\'font-family:SJQY\'>x</span>')"><span style='font-family:SJQY'>x</span></td>
            <td class="specific_symbol_hand" @click="select('<span style=\'font-family:SJQY\'>y</span>')"><span style='font-family:SJQY'>y</span></td>
            <td class="specific_symbol_hand" @click="select('<span style=\'font-family:SJQY\'>z</span>')"><span style='font-family:SJQY'>z</span></td>
            <td class="specific_symbol_hand" @click="select('<span style=\'font-family:SJQY\'>{</span>')"><span style='font-family:SJQY'>{</span></td>
            <td class="specific_symbol_hand" @click="select('<span style=\'font-family:SJQY\'>J</span>')"><span style='font-family:SJQY'>J</span></td>
            <td class="specific_symbol_hand" @click="select('<span style=\'font-family:SJQY\'>}</span>')"><span style='font-family:SJQY'>}</span></td>    
          </tr>
          <tr>
            <td class="specific_symbol_hand" @click="select('<span style=\'font-family:SJQY\'>~</span>')"><span style='font-family:SJQY'>~</span></td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
        </table>
      </div>
    </el-tab-pane>
    <el-tab-pane label="希腊字母">
      <div class="sspanel">
        <table width="100%" class="specific_symbol_table">
          <tr>
            <td class="specific_symbol_hand" @click="select('α')">α</td>
            <td class="specific_symbol_hand" @click="select('β')">β</td>
            <td class="specific_symbol_hand" @click="select('γ')">γ</td>
            <td class="specific_symbol_hand" @click="select('δ')">δ</td>
            <td class="specific_symbol_hand" @click="select('ε')">ε</td>
            <td class="specific_symbol_hand" @click="select('ζ')">ζ</td>
            <td class="specific_symbol_hand" @click="select('η')">η</td>
            <td class="specific_symbol_hand" @click="select('θ')">θ</td>
            <td class="specific_symbol_hand" @click="select('ι')">ι</td>
            <td class="specific_symbol_hand" @click="select('κ')">κ</td>
          </tr>
          <tr>
            <td class="specific_symbol_hand" @click="select('λ')">λ</td>
            <td class="specific_symbol_hand" @click="select('μ')">μ</td>
            <td class="specific_symbol_hand" @click="select('ν')">ν</td>
            <td class="specific_symbol_hand" @click="select('ξ')">ξ</td>
            <td class="specific_symbol_hand" @click="select('ο')">ο</td>
            <td class="specific_symbol_hand" @click="select('π')">π</td>
            <td class="specific_symbol_hand" @click="select('ρ')">ρ</td>
            <td class="specific_symbol_hand" @click="select('σ')">σ</td>
            <td class="specific_symbol_hand" @click="select('τ')">τ</td>
            <td class="specific_symbol_hand" @click="select('υ')">υ</td>
          </tr>
          <tr>
            <td class="specific_symbol_hand" @click="select('φ')">φ</td>
            <td class="specific_symbol_hand" @click="select('χ')">χ</td>
            <td class="specific_symbol_hand" @click="select('ψ')">ψ</td>
            <td class="specific_symbol_hand" @click="select('ω')">ω</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
        </table>
      </div>
    </el-tab-pane>
    <el-tab-pane label="带圈字母">
      <div class="sspanel" style="font-size: 18px;">
        <table width="100%" class="specific_symbol_table">
          <tr>
            <td class="specific_symbol_hand" @click="select('Ⓐ')">Ⓐ</td>
            <td class="specific_symbol_hand" @click="select('Ⓑ')">Ⓑ</td>
            <td class="specific_symbol_hand" @click="select('Ⓒ')">Ⓒ</td>
            <td class="specific_symbol_hand" @click="select('Ⓓ')">Ⓓ</td>
            <td class="specific_symbol_hand" @click="select('Ⓔ')">Ⓔ</td>
            <td class="specific_symbol_hand" @click="select('Ⓕ')">Ⓕ</td>
            <td class="specific_symbol_hand" @click="select('Ⓖ')">Ⓖ</td>
            <td class="specific_symbol_hand" @click="select('Ⓗ')">Ⓗ</td>
            <td class="specific_symbol_hand" @click="select('Ⓘ')">Ⓘ</td>
            <td class="specific_symbol_hand" @click="select('Ⓙ')">Ⓙ</td>
          </tr>
          <tr>
            <td class="specific_symbol_hand" @click="select('Ⓚ')">Ⓚ</td>
            <td class="specific_symbol_hand" @click="select('Ⓛ')">Ⓛ</td>
            <td class="specific_symbol_hand" @click="select('Ⓜ')">Ⓜ</td>
            <td class="specific_symbol_hand" @click="select('Ⓝ')">Ⓝ</td>
            <td class="specific_symbol_hand" @click="select('Ⓞ')">Ⓞ</td>
            <td class="specific_symbol_hand" @click="select('Ⓟ')">Ⓟ</td>
            <td class="specific_symbol_hand" @click="select('Ⓠ')">Ⓠ</td>
            <td class="specific_symbol_hand" @click="select('Ⓡ')">Ⓡ</td>
            <td class="specific_symbol_hand" @click="select('Ⓢ')">Ⓢ</td>
            <td class="specific_symbol_hand" @click="select('Ⓣ')">Ⓣ</td>
          </tr>
          <tr>
            <td class="specific_symbol_hand" @click="select('Ⓤ')">Ⓤ</td>
            <td class="specific_symbol_hand" @click="select('Ⓥ')">Ⓥ</td>
            <td class="specific_symbol_hand" @click="select('Ⓦ')">Ⓦ</td>
            <td class="specific_symbol_hand" @click="select('Ⓧ')">Ⓧ</td>
            <td class="specific_symbol_hand" @click="select('Ⓨ')">Ⓨ</td>
            <td class="specific_symbol_hand" @click="select('Ⓩ')">Ⓩ</td>
            <td class="specific_symbol_hand" @click="select('ⓐ')">ⓐ</td>
            <td class="specific_symbol_hand" @click="select('ⓑ')">ⓑ</td>
            <td class="specific_symbol_hand" @click="select('ⓒ')">ⓒ</td>
            <td class="specific_symbol_hand" @click="select('ⓓ')">ⓓ</td>
          </tr>
          <tr>
            <td class="specific_symbol_hand" @click="select('ⓔ')">ⓔ</td>
            <td class="specific_symbol_hand" @click="select('ⓕ')">ⓕ</td>
            <td class="specific_symbol_hand" @click="select('ⓖ')">ⓖ</td>
            <td class="specific_symbol_hand" @click="select('ⓗ')">ⓗ</td>
            <td class="specific_symbol_hand" @click="select('ⓘ')">ⓘ</td>
            <td class="specific_symbol_hand" @click="select('ⓙ')">ⓙ</td>
            <td class="specific_symbol_hand" @click="select('ⓚ')">ⓚ</td>
            <td class="specific_symbol_hand" @click="select('ⓛ')">ⓛ</td>
            <td class="specific_symbol_hand" @click="select('ⓜ')">ⓜ</td>
            <td class="specific_symbol_hand" @click="select('ⓝ')">ⓝ</td>
          </tr>
          <tr>
            <td class="specific_symbol_hand" @click="select('ⓞ')">ⓞ</td>
            <td class="specific_symbol_hand" @click="select('ⓟ')">ⓟ</td>
            <td class="specific_symbol_hand" @click="select('ⓠ')">ⓠ</td>
            <td class="specific_symbol_hand" @click="select('ⓡ')">ⓡ</td>
            <td class="specific_symbol_hand" @click="select('ⓢ')">ⓢ</td>
            <td class="specific_symbol_hand" @click="select('ⓣ')">ⓣ</td>
            <td class="specific_symbol_hand" @click="select('ⓤ')">ⓤ</td>
            <td class="specific_symbol_hand" @click="select('ⓥ')">ⓥ</td>
            <td class="specific_symbol_hand" @click="select('ⓦ')">ⓦ</td>
            <td class="specific_symbol_hand" @click="select('ⓧ')">ⓧ</td>
          </tr>
          <tr>
            <td class="specific_symbol_hand" @click="select('ⓨ')">ⓨ</td>
            <td class="specific_symbol_hand" @click="select('ⓩ')">ⓩ</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
        </table>
      </div>
    </el-tab-pane>
    <el-tab-pane label="罗马字符">
      <div class="sspanel">
        <table width="100%" class="specific_symbol_table">
          <tr>
            <td class="specific_symbol_hand" @click="select('Ⅰ')">Ⅰ</td>
            <td class="specific_symbol_hand" @click="select('Ⅱ')">Ⅱ</td>
            <td class="specific_symbol_hand" @click="select('Ⅲ')">Ⅲ</td>
            <td class="specific_symbol_hand" @click="select('Ⅳ')">Ⅳ</td>
            <td class="specific_symbol_hand" @click="select('Ⅴ')">Ⅴ</td>
            <td class="specific_symbol_hand" @click="select('Ⅵ')">Ⅵ</td>
            <td class="specific_symbol_hand" @click="select('Ⅶ')">Ⅶ</td>
            <td class="specific_symbol_hand" @click="select('Ⅷ')">Ⅷ</td>
            <td class="specific_symbol_hand" @click="select('Ⅸ')">Ⅸ</td>
            <td class="specific_symbol_hand" @click="select('Ⅹ')">Ⅹ</td>
          </tr>
          <tr>
            <td class="specific_symbol_hand" @click="select('Ⅺ')">Ⅺ</td>
            <td class="specific_symbol_hand" @click="select('Ⅻ')">Ⅻ</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
        </table>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
/* Copyright (C) <1998-2024> Glodon Company Limited
 * Licensed under the MIT License
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import {ElTabs, ElTabPane, ElTable, ElTableColumn} from 'element-plus'
export default {
  components: {ElTabs, ElTabPane, ElTable, ElTableColumn},
  methods:{
    select(val) {
      this.$emit('symbolClick',val);
    },
  },
}
</script>
<style lang="less" scoped>
  .sspanel{
    height: 170px;
  }
  table.specific_symbol_table tr td{
    text-align: center;
    width: 54px;
    height: 36px;
  }
  .specific_symbol_hand{
    cursor:pointer;
  }
  // @font-face {
  //   font-family: SJQY;
  //   src: url('./font/SJQY.ttf');
  // }

  :deep(.specific_symbol_tabs) {
    .el-tabs__item {
      height: 32px;
      line-height: 32px;
    }
  }

  td{
    &:hover{
      color: #409eff;
    }
  }
</style>
