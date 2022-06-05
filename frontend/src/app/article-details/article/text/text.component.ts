import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {

  constructor(private domSanitizer: DomSanitizer) { }

  @Input()
  text : any = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis eligendi tempore nostrum facere ullam ducimus, laudantium cum ab suscipit, velit voluptatum! Fugiat, explicabo exercitationem officiis obcaecati minima impedit laudantium error eius ea modi, ipsum alias amet quas? Impedit inventore ea fuga, tempore sit eveniet deleniti illo voluptatibus eos architecto vitae aut animi atque repellat consequatur quis amet, quas necessitatibus! Enim fuga eligendi temporibus ipsam voluptas quia, id illo excepturi hic beatae nobis, saepe similique minus voluptates. Quo dicta vel in minus ab atque accusamus quas, perspiciatis dignissimos nostrum aut officia laudantium. Sequi reprehenderit fuga deleniti optio doloribus similique nostrum praesentium fugit beatae velit animi, vel commodi reiciendis corrupti voluptas laboriosam. Obcaecati delectus pariatur ipsum voluptates quisquam placeat dolores quos aperiam expedita consectetur cupiditate laborum, itaque, corporis tenetur fugiat ut nihil modi, inventore omnis iusto reiciendis! Labore error nemo velit voluptate aliquid cumque maxime ratione consequuntur repudiandae sit officia veritatis, explicabo ad doloribus odit dicta aut soluta. Labore, nihil aspernatur alias quasi atque doloribus nulla quis voluptate, dolor inventore error minus voluptas. Quibusdam fugiat harum quo asperiores accusantium cumque iusto sunt mollitia doloribus velit corporis, blanditiis commodi animi totam recusandae, natus neque enim laborum iure laudantium suscipit necessitatibus et, repellendus nostrum!"

  ngOnInit(): void {
    this.text = this.domSanitizer.bypassSecurityTrustHtml(this.text)
  }

}
