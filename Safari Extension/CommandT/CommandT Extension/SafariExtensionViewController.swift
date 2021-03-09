//
//  SafariExtensionViewController.swift
//  Hello Extension
//
//  Created by 전하성 on 2021/03/08.
//

import SafariServices

class SafariExtensionViewController: SFSafariExtensionViewController {
    
    @IBOutlet weak var urlLabel: NSTextField!
    @IBOutlet weak var titleLabel: NSTextField!
    @IBOutlet weak var colorLabel: NSTextField!
    @IBOutlet weak var urlTextfield: NSTextField!
    @IBOutlet weak var titleTextfield: NSTextField!
    @IBOutlet weak var colorPicker: NSPopUpButton!
    @IBOutlet weak var saveBtn: NSButton!

    static let shared: SafariExtensionViewController = {
        let shared = SafariExtensionViewController()
        shared.preferredContentSize = NSSize(width: 360, height:190)
        return shared
    }()

    override func viewDidLoad() {
        super.viewDidLoad()
        setup()
    }
    func setup() {
        self.saveBtn.title = "Save"
        setupDropdown()
        SFSafariApplication.getActiveWindow(completionHandler: { window in
            
            window?.getActiveTab(completionHandler: { tab in
                
                tab?.getActivePage(completionHandler: { page in
                    page?.getPropertiesWithCompletionHandler( { props in
                        if props?.url != nil {
                            if let urlString = props!.url?.absoluteString {
                                self.urlTextfield.stringValue = urlString
                                
                            }
                            if let titleString = props!.title {
                                self.titleTextfield.stringValue = titleString
                            }
                            
                            
                        }
                    })
                })
            })
        })
    }
    func setupDropdown() {
        
        
        
    }
    override func viewWillDisappear() {
        self.removeFromParent()
    }
    

}
